const webpush = require("web-push");
const qs = require("qs");

webpush.setVapidDetails(
  "mailto:nf.denuzzo@gmail.com",
  "BJeT3WbOLmulqq1RNixIGxdtDcO7oxIZ2XYzZtk5MV0ucrbMrGIq-JLW26x53JTh33hBeoI_aOu31XM8Z3Mq2kE", // public key
  "UGAp_564eb02K5qedd74b-wypGfJHMDdsFA5_0K-KgI" // private key
);

module.exports = {
  sendPushNotification,
};

async function sendPushNotification(
  subscription,
  status
) {
  try {
    const obj = qs.parse(subscription);
    const imageUrl = "";
    const pushSubscription = {
      endpoint: obj.endpoint,
      keys: {
        auth: obj.keys.auth,
        p256dh: obj.keys.p256dh,
      },
    };
    const pushContent = {
      title: "Order Status Update!!",
      body: getNotificationBodyWording(status),
      openUrl: "http://localhost:8080/view-my-active-orders",
      imageUrl: imageUrl,
    };
    const pushContentStringified = JSON.stringify(pushContent);
    await webpush.sendNotification(pushSubscription, pushContentStringified);
  } catch (ex) {
    console.log("sendPushNotification -> ex", ex);
  }
}

function getNotificationBodyWording(status) {
  switch (status) {
    case "PROCESSING":
      return "Your order has been placed!";
    case "PREPARING":
      return "Your order is currently being prepared!";
    case "OUT FOR DELIVERY":
      return "Your order is out for delivery!";
    case "READY FOR COLLECTION":
      return "Your order is ready for collection!";
    case "COMPLETE":
      return "Thank you for your continued support!";
    case "FAILED":
        return "Your order payment was unsuccessful, please try again!";
  }
}
