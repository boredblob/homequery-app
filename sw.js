const cacheName = "dynamic-cache-v1";
const precacheResources = [
  "/",
  "/books",
  "/dvds",
  "index.html",
  "books/index.html",
  "dvds/index.html",
  //Icons
  "favicon.ico",
  "icons/favicon.png",
  "icons/icon-128.png",
  "icons/icon-144.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-72.png",
  "icons/icon-96.png",
  //Images
  "images/check.svg",
  "images/confused.svg",
  "images/edit.svg",
  "images/menu.svg",
  "images/moon.svg",
  "images/spinner.svg",
  "images/sun.svg",
  "images/wordmark-dark.svg",
  "images/wordmark.svg",
  "images/x.svg",
  //Other
  "manifest.json",
  "pwa.js",
  //Scripts
  "scripts/home/app.mjs",
  "scripts/home/buttons.mjs",
  "scripts/home/forms.mjs",
  "scripts/home/theme.js",
  "scripts/list/addEntry.mjs",
  "scripts/list/editEntry.mjs",
  "scripts/list/init.mjs",
  "scripts/list/removeEntry.mjs",
  "scripts/list/results.mjs",
  "scripts/createElement.mjs",
  "scripts/error.mjs",
  "scripts/onlineUI.js",
  "scripts/sidepanel.js",
  "scripts/signout.js",
  "scripts/state.mjs",
  "scripts/theme.js",
  //Styles
  "styles/app.css",
  "styles/home.css",
  //Fallback
  "404/app.js",
  "404/arms.svg",
  "404/circle.svg",
  "404/index.html",
  "404/main.css",
];

self.addEventListener("install", e => {
  console.log("Installing");
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
      .catch(err => {
        console.error("Error while installing: ", err)
      })
  );
});

self.addEventListener("activate", e => {
  const cacheKeeplist = [cacheName];
  
  e.waitUntil(async function() {
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    });
    if (self.registration.navigationPreload) {
      await self.registration.navigationPreload.enable();
    }
  }());
  console.log("Activated");
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(caches.match(event.request)
    .then(async response => {
      
      const fetchPromise = event.preloadResponse || fetch(event.request)
        .then(async networkResponse => {
          if (!networkResponse.ok && networkResponse.status !== 0) {
            throw "Bad response from " + event.request.url;
          }
          return caches.open(cacheName)
          .then(cache => {
            cache.put(event.request.url, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(async err => {
          console.log("Error while fetching new site.\n" + err);
          return caches.open(cacheName)
            .then(cache => {
              online = false;
              return cache.match('/404/index.html');
            });
        });
      return response || await fetchPromise;
    })
  );
});