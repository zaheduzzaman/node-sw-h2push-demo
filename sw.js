var CACHE_NAME = 'my-sw-v1';
var urlsToCache = [
  '/images/mustang_frm_sw.jpg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// following code is from html5rock tutorial. I think this is one of the best way of writing SW code. see http://www.html5rocks.com/en/tutorials/service-worker/introduction/
self.addEventListener('fetch', function(event) {
  //var requestURL = new URL(event.request.url);
  //console.log ("requested URL path =" + requestURL.pathname);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        
        if (response) {
          return response;
        }

        
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                //if (requestURL.pathname !='/images/mustang_frm_pushed.jpg' || requestURL.pathname !='/images/mustang_frm_nonpushed.jpg') {
                  cache.put(event.request, responseToCache);
                //};
                
              });

            return response;
          }
        );
      })
    );
});