self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Nouveau message';
  const options = {
    body: data.body || 'Vous avez reçu un nouveau message.',
    icon: '/icon-192x192.png', // optionnel
    badge: '/icon-72x72.png', // optionnel
    data: {
      url: data.url || '/messagerie'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
