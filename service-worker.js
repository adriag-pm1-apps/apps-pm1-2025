const CACHE_NAME = 'pm1-cache-v4';  // nueva versión de caché

const URLS_TO_CACHE = [
  'index.html',
  'pm1_razones_prop_porcent_OFFLINE.html',
  'pm1_regla_de_tres_OFFLINE.html',
  'pm1_mcm_mcd_quiz_OFFLINE.html',
  'pm1_exponentes_OFFLINE (2).html',
  'pm1_exponentes_avanzados_OFFLINE_RESET.html',
  'pm1_exponentes_especiales_OFFLINE.html',
  'manifest.json',
  'icon_192.png',
  'icon_512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;    // usa caché si ya está
      }
      return fetch(event.request);  // si no, va a la red
    })
  );
});
