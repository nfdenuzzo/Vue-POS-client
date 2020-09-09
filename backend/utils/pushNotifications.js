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

async function sendPushNotification(subscription) {
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
    title: "Your order has been placed!",
    body: "View your order status now!",
    openUrl: "http://localhost:8080/view-my-active-orders",
    imageUrl: imageUrl,
  };
  const pushContentStringified = JSON.stringify(pushContent);
  await webpush.sendNotification(
    pushSubscription,
    pushContentStringified
  );
}
