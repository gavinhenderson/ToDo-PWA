!function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="../docs/",t(t.s=257)}({257:function(e,n){var t="static-v".concat(1556055538.142),o=["bundle.js","index.html","manifest.json","favicon.png"],r=new Response("<div><h2>You are offline</h2></div>",{headers:{"Content-type":"text/html"}});self.addEventListener("install",function(e){e.waitUntil(caches.open(t).then(function(e){return e.addAll(o).then(function(){return self.skipWaiting()})}))}),self.onactivate=function(e){console.log("on activate - ".concat(t)),e.waitUntil(caches.keys().then(function(e){var n=e.map(function(e){return console.log(e),e!=t?caches.delete(e):Promise.resolve()});return Promise.all(n)})),self.clients.claim()},self.onfetch=function(e){e.respondWith(caches.match(e.request).then(function(n){return console.log("Responding with CACHE to:",e.request.url),n||(!navigator.onLine&&function(e){return e.toString().toLowerCase().includes(".html")}(e.request.url)?r:fetch(e.request))})),console.log("on fetch - ".concat(t))}}});