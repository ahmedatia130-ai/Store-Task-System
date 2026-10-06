/* 2S — service worker الإشعارات
   بيستقبل الإشعار من Firebase حتى لو الأبلكيشن مقفول، ويعرضه على الموبايل.
   الضغط على الإشعار بيفتح الأبلكيشن (أو يرجع للتاب المفتوح). */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function(e){
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { try { d = {data:{body:e.data.text()}}; } catch (y) {} }
  var m = d.data || d.notification || d || {};
  var title = String(m.title || '2S Store Task System');
  var opt = {
    body: String(m.body || ''),
    icon: 'favicon-192.png',
    badge: 'favicon-192.png',
    dir: m.dir === 'ltr' ? 'ltr' : 'rtl',
    lang: m.lang === 'en' ? 'en' : 'ar',
    vibrate: [80, 40, 80],
    data: {url: './'}
  };
  e.waitUntil(self.registration.showNotification(title, opt));
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list){
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf(self.registration.scope) === 0 && 'focus' in list[i]) return list[i].focus();
    }
    return self.clients.openWindow ? self.clients.openWindow(url) : null;
  }));
});
