/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "0a943150818e0346c36bb072d1a571f2"
  }, {
    "url": "pwa-512x512.png",
    "revision": "445e80c0a07edc31f18f8975797c0b09"
  }, {
    "url": "pwa-192x192.png",
    "revision": "0ab130d7108e5023a71afe9cd6735c16"
  }, {
    "url": "index.html",
    "revision": "54b65ecab4e519160127c1de8cde34e4"
  }, {
    "url": "icon.svg",
    "revision": "af7e8ebcd63041e996b78b6128e9032e"
  }, {
    "url": "favicon.ico",
    "revision": "abd0aed767ad8dedb143e86b384a5860"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "536f391424563b9981043562d445cb20"
  }, {
    "url": "assets/index-DTvtonVq.css",
    "revision": null
  }, {
    "url": "assets/index-C09SNl0c.js",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "536f391424563b9981043562d445cb20"
  }, {
    "url": "favicon.ico",
    "revision": "abd0aed767ad8dedb143e86b384a5860"
  }, {
    "url": "icon.svg",
    "revision": "af7e8ebcd63041e996b78b6128e9032e"
  }, {
    "url": "pwa-192x192.png",
    "revision": "0ab130d7108e5023a71afe9cd6735c16"
  }, {
    "url": "pwa-512x512.png",
    "revision": "445e80c0a07edc31f18f8975797c0b09"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "0a943150818e0346c36bb072d1a571f2"
  }, {
    "url": "manifest.webmanifest",
    "revision": "d5be344052d7318dff247e5b450b110b"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
