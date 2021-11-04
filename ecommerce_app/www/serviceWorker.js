const staticCacheName = 'precache-v1.0';
const dynamicCacheName = 'runtimeCache-v1.0';

var precacheAssets = [
  'index.html',
  '0.page-404.html',
  '01.page-index.html',
  'css/ui.css',
  'css/bootstrap.css',
  'js/jquery-2.0.0.min.js',
  'js/script.js',
  'js/pwa.js',
  'images/logo.png',
  'images/icons/404.svg',
  'fonts/material-icon/css/round.css',
  'fonts/material-icon/font/MaterialIcons-Round.woff',
  'fonts/material-icon/font/MaterialIcons-Round.ttf',
  'fonts/material-icon/font/MaterialIcons-Round.woff2',
  'manifest.json',
];

// Install Event
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(precacheAssets);
        })
    );
});

// Activate Event
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(response => {
                return caches.open(dynamicCacheName).then(function (cache) {
                    cache.put(event.request, response.clone());
                    return response;
                })
            });
        }).catch(function() {
            // Fallback Page, When No Internet Connection
            return caches.match('9.page-404.html');
          })
    );
});

