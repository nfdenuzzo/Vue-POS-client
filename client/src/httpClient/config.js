import Axios from "axios";
import Vue from "vue";
import { logout, userNotPermitted } from "../utils/auth.js";
const url = process.env.BACKEND_URL;
import { Notify } from "quasar";

let axiosInstance = Axios.create({
  baseURL: url,
  headers: {}
});

// this ensures we get the right token for authroization
axiosInstance.interceptors.request.use(
  function(config) {
    let token = localStorage.getItem("access_token");
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// this redirects if the token above expires.
axiosInstance.interceptors.response.use(
  response => {
    switch (response.status) {
      case 200:
        console.log("Operation was Successful.");
        break;
      // A successful response SHOULD be 200 (OK) if the response includes an entity describing the status, 201 (Created)
      case 201:
        console.log("Creation was Successful.");
        break;
      // A successful response SHOULD be 200 (OK) if the response includes an entity describing the status, 202 (Accepted)
      // if the action has not yet been enacted, or 204 (No Content) if the action has been enacted but the response does not include an entity.
      case 202:
        console.log("Update was Successful.");
        break;
      case 204:
        console.log("Deletion was Successful.");
        break;
    }
    return response;
  },
  error => {
    // No response from server, so either the server is
    // down or their internet is off --> Network error
    if (!error.response) {
      // We custom build the object because it is undefineds
      error.response = {
        status: 503,
        config: null,
        data: null,
        headers: null,
        request: XMLHttpRequest,
        statusText: "Network Error"
      };
    }
    // We did receive a response from the server
    switch (error.response.status) {
      // Unauthorized, either his token expired or he does not have on.
      case 401:
        userNotPermitted();
        Notify.create({
          type: "negative",
          message: "We could not authorize you, reload or login again",
          color: "logoRed"
        });
        return error.response;
      // We clear the storage so that the authorize request can be executed the next time the page reloads
      // Bad request, either a model error or an error we want the user to see
      case 400:
        Notify.create({
          type: "negative",
          message:
            error.response &&
            error.response.data &&
            error.response.data.errors.length > 0
              ? error.response.data.errors[0].msg
              : "There were either outstanding required data or the data was not in the correct format.",
          color: "logoRed"
        });
        return error.response;
      // Forbidden, user does not have the required rights to view a page
      case 403:
        Notify.create({
          type: "negative",
          message: "This action is forbidden!",
          color: "logoRed"
        });
        break;
      case 406:
        console.log("Sorry, error 406");
        return error.response;
      // Backend-controller action was not found.
      case 404:
        Notify.create({
          type: "negative",
          message: "Sorry, the resource was not found on the server.",
          color: "logoRed"
        });
        return error.response;
      case 499:
          Notify.create({
            type: "negative",
            message: "Sorry, the platform is closed to new orders.",
            color: "logoRed"
          });
          return error.response;
      // Internal server error
      case 500:
        Notify.create({
          type: "negative",
          message:
            "An error occurred on the server. Please try again. Sorry for the inconvenience.",
          color: "logoRed"
        });
        return error.response;
      // Network related error
      case 503:
        logout();
        Notify.create({
          type: "negative",
          message: "Sorry, the server is unavailable.",
          color: "logoRed"
        });
        return error.response;
      // Unexpected error code
      default:
        console.log(
          "We are not sure what just happened, Please try again. Sorry for the inconvenience"
        );
        return error.response;
    }

    return Promise.reject(error);
  }
);

Vue.prototype.$http = axiosInstance;

export default {
  axiosInstance
};
