const qs = require("qs");

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function webPushCreateSub() {
  let reg;
  const serviceWorkerResults = await navigator.serviceWorker.ready.then(
    async swreg => {
      reg = swreg;
      const resultCreateSub = await createPushSubscription(reg);
      return resultCreateSub;
    }
  );
  return serviceWorkerResults;
}

export async function createPushSubscription(reg) {
  const vapidPublicKey =
    "BJeT3WbOLmulqq1RNixIGxdtDcO7oxIZ2XYzZtk5MV0ucrbMrGIq-JLW26x53JTh33hBeoI_aOu31XM8Z3Mq2kE";
  const vapidPublicKeyConverted = urlBase64ToUint8Array(vapidPublicKey);
  const result = await reg.pushManager
    .subscribe({
      applicationServerKey: vapidPublicKeyConverted,
      userVisibleOnly: true
    })
    .then(async newSub => {
      const newSubData = newSub.toJSON();
      const newSubDataQS = qs.stringify(newSubData);
      return newSubDataQS;
    })
    .catch(err => {
      console.log("err: ", err);
    });
  return result;
}
