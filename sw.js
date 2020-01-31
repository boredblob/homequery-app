const cacheName = "dynamic-cache-v1";
const precacheResources = [
  "/",
  "index.html",
  "/books",
  "/books/index.html",
  "main.css",
  "pwa.js",
  "scripts/films/app.mjs",
  "scripts/films/addFilm.mjs",
  "scripts/films/editFilm.mjs",
  "scripts/films/removeFilm.mjs",
  "scripts/films/results.mjs",
  "scripts/books/app.mjs",
  "scripts/books/addBook.mjs",
  "scripts/books/editBook.mjs",
  "scripts/books/removeBook.mjs",
  "scripts/books/results.mjs",
  "scripts/createElement.mjs",
  "scripts/crypto.mjs",
  "scripts/error.mjs",
  "scripts/sidepanel.js",
  "scripts/theme.js",
  "scripts/token.js",
  "favicon.ico",
  "icons/favicon.png",
  "icons/icon-72.png",
  "icons/icon-96.png",
  "icons/icon-128.png",
  "icons/icon-144.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "images/check.svg",
  "images/edit.svg",
  "images/menu.svg",
  "images/moon.svg",
  "images/spinner.svg",
  "images/sun.svg",
  "images/x.svg"
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
  
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
      
    })
  );
  console.log("Activated");
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(caches.match(event.request)
    .then(response => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          return caches.open(cacheName)
          .then(cache => {
            cache.put(event.request.url, networkResponse.clone());
            return networkResponse;
          })
        })
        .catch(err => {
          return caches.open(cacheName)
            .then(cache => {
              online = false;
              return cache.match('/');
            });
        });
      return response || fetchPromise;
    })
  );
});