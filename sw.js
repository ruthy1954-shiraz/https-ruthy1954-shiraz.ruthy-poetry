const CACHE_NAME = "lagaat-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./icons/oklagaat-192x192.png",
  "./icons/oklagaat-512x512.png",
  "./content/images/shir.jpeg"
];

// התקנה – שמירת קבצים בזיכרון
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// הפעלה – ניקוי גרסאות ישנות + הודעת זמינות
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Service Worker: clearing old cache");
            return caches.delete(name);
          }
        })
      )
    )
  );

  // הודעת זמינות
  self.registration.showNotification("לגעת", {
    body: "האתר זמין גם ללא אינטרנט 🌸",
    icon: "icons/oklagaat-192x192.png"
  });
});

// שליפה – טעינה מה‑cache או מהרשת
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

