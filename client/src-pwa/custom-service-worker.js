/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */

/*
  dependencies
*/

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { NetworkFirst } from "workbox-strategies";
import { skipWaiting, clientsClaim, setCacheNameDetails } from "workbox-core";

/*
  config
*/

setCacheNameDetails({ prefix: "d4" });
//Change this value every time before you build
const LATEST_VERSION = "v1.6";
self.addEventListener("activate", event => {
  console.log(`%c ${LATEST_VERSION} `, "background: #ddd; color: #0000ff");
  if (caches) {
    caches.keys().then(arr => {
      arr.forEach(key => {
        if (key.indexOf("d4-precache") < -1) {
          caches
            .delete(key)
            .then(() =>
              console.log(
                `%c Cleared ${key}`,
                "background: #333; color: #ff0000"
              )
            );
        } else {
          caches.open(key).then(cache => {
            cache.match("version").then(res => {
              if (!res) {
                cache.put(
                  "version",
                  new Response(LATEST_VERSION, {
                    status: 200,
                    statusText: LATEST_VERSION
                  })
                );
              } else if (res.statusText !== LATEST_VERSION) {
                caches
                  .delete(key)
                  .then(() =>
                    console.log(
                      `%c Cleared Cache ${LATEST_VERSION}`,
                      "background: #333; color: #ff0000"
                    )
                  );
              } else
                console.log(
                  `%c Great you have the latest version ${LATEST_VERSION}`,
                  "background: #333; color: #00ff00"
                );
            });
          });
        }
      });
    });
  }
});

clientsClaim();
skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

let backgroundSyncSupported = "sync" in self.registration ? true : false;
console.log("backgroundSyncSupported: ", backgroundSyncSupported);

/*
  caching strategies
*/

registerRoute(
  ({ url }) => url.host.startsWith("fonts.g"),
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
);

registerRoute(({ url }) => url.pathname.startsWith("/api"), new NetworkFirst());

registerRoute(({ url }) => url.href.startsWith("http"), new NetworkFirst());

/*
  events - push
*/

self.addEventListener("push", event => {
  console.log("Push message received:", event);
  if (event.data) {
    let data = JSON.parse(event.data.text());
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: "icons/icon-128x128.png",
        badge: "icons/icon-128x128.png",
        image: data.imageUrl,
        data: {
          openUrl: data.openUrl
        }
      })
    );
  }
});

/*
  events - notifications
*/

self.addEventListener("notificationclick", event => {
  let notification = event.notification;
  event.waitUntil(
    clients.matchAll().then(clis => {
      let clientUsingApp = clis.find(cli => {
        return cli.visibilityState === "visible";
      });
      if (clientUsingApp) {
        clientUsingApp.navigate(notification.data.openUrl);
        clientUsingApp.focus();
      } else {
        clients.openWindow(notification.data.openUrl);
      }
    })
  );
  notification.close();
});

self.addEventListener("notificationclose", event => {
  console.log("Notification was closed", event);
});
