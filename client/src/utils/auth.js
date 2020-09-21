import store from "../store/index.js";
import auth0 from "auth0-js";
import Router from "vue-router";
import jwtDecode from "jwt-decode";

const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const CLIENT_DOMAIN = process.env.AUTH0_DOMAIN;
const SCOPE = "openid email profile role";
const AUDIENCE = process.env.AUTH0_AUDIENCE;

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: "token id_token",
    redirectUri: `${window.location.origin}/callback`,
    audience: AUDIENCE,
    scope: SCOPE
  });
}

var router = new Router({
  mode: "history"
});

export function logout() {
  clearIdToken();
  clearAccessToken();
  store.dispatch("updateAuthStatus", false);
  // this is required to log a user out as it saves a user
  auth.logout({
    returnTo: `${window.location.origin}`,
    clientID: CLIENT_ID
  });
  router.push("/").catch(() => {});
}


function hasCorrectPermissions() {
  return store.getters.getUserPermissions.includes("read:systemData");
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn() && !hasCorrectPermissions) {
    next({
      path: "/",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function getIdToken() {
  return localStorage.getItem("id_token");
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

function clearIdToken() {
  localStorage.removeItem("id_token");
}

function clearAccessToken() {
  localStorage.removeItem("access_token");
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

// Get and store access_token in local storage
export async function setAccessToken() {
  let accessToken = getParameterByName("access_token");
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    const result = await jwtDecode(accessToken);
    store.commit("setUserPermissions", result.permissions);
    store.dispatch("updateAuthStatus", true);
    store.dispatch("retrieveMyProfile", { forceRefresh: true });
  }
}

// Get and store id_token in local storage
export async function setIdToken() {
  let idToken = getParameterByName("id_token");
  if (idToken) {
    localStorage.setItem("id_token", idToken);
    const result = await jwtDecode(idToken);
    store.commit("setProfile", {
      name: result.given_name,
      email: result.email
    });
  }
}

export function isLoggedIn() {
  const idToken = getIdToken();
  if (!idToken || isTokenExpired(idToken)) {
    store.dispatch("updateAuthStatus", false);
    store.commit("setUserPermissions", []);
    store.commit("setProfile", null);
  }
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = jwtDecode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function userNotPermitted() {
  logout();
}
