/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../docs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sw.js":
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var CACHENAME = \"static-v\".concat(1555953939.205);\nvar ASSETS = ['bundle.js', 'index.html', 'manifest.json', 'favicon.png'];\nvar DEBUG = true;\nvar offlineResponse = new Response(\"<div><h2>You are offline</h2></div>\", {\n  headers: {\n    'Content-type': 'text/html'\n  }\n});\n\nvar includesHTML = function includesHTML(url) {\n  return url.toString().toLowerCase().includes('.html');\n};\n\nself.addEventListener('install', function (event) {\n  event.waitUntil(caches.open(CACHENAME).then(function (cache) {\n    return cache.addAll(ASSETS).then(function () {\n      return self.skipWaiting();\n    });\n  }));\n});\n\nself.onactivate = function (evt) {\n  console.log(\"on activate - \".concat(CACHENAME));\n  evt.waitUntil(caches.keys().then(function (cacheNames) {\n    var deleteOldCaches = cacheNames.map(function (cacheName) {\n      console.log(cacheName);\n\n      if (cacheName != CACHENAME) {\n        return caches.delete(cacheName);\n      }\n\n      return Promise.resolve();\n    });\n    return Promise.all(deleteOldCaches);\n  }));\n  self.clients.claim();\n};\n\nself.onfetch = function (evt) {\n  evt.respondWith(caches.match(evt.request).then(function (response) {\n    console.log('Responding with CACHE to:', evt.request.url);\n    if (response) return response;\n\n    if (!navigator.onLine && includesHTML(evt.request.url)) {\n      if (DEBUG) console.log('Responding with OFFLINE MESSAGE to:', evt.request.url);\n      return offlineResponse;\n    }\n\n    if (DEBUG) console.log('Responding with FETCH to:', evt.request.url);\n    return fetch(evt.request);\n  }));\n  console.log(\"on fetch - \".concat(CACHENAME));\n};\n\n//# sourceURL=webpack:///./src/sw.js?");

/***/ })

/******/ });