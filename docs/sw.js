!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="../docs/",n(n.s=264)}({264:function(e,t,n){const o="static-v1556463987.901",r=["bundle.js","index.html","manifest.json","favicon.png","/"],i=n(265),{BASE_URL:a}=n(30),c=new Response("<div><h2>You are offline</h2></div>",{headers:{"Content-type":"text/html"}});self.addEventListener("install",function(e){e.waitUntil(caches.open(o).then(function(e){return e.addAll(r).then(()=>self.skipWaiting())}))}),self.onactivate=(e=>{console.log(`on activate - ${o}`),e.waitUntil(caches.keys().then(e=>{const t=e.map(e=>(console.log(e),e!=o?caches.delete(e):Promise.resolve()));return Promise.all(t)})),self.clients.claim()}),self.onfetch=(e=>{e.respondWith((async()=>{const t=new URL(e.request.url).pathname;if(t.includes("list")||t.includes("add"))return await i(e.request);const n=await caches.match(e.request);return n||(!navigator.onLine&&(e=>e.toString().toLowerCase().includes(".html"))(e.request.url)?c:await fetch(e.request))})())})},265:function(e,t){e.exports=(async e=>await fetch(e))},30:function(e,t){e.exports={BASE_URL:"https://todo-pwa-backend.herokuapp.com"}}});