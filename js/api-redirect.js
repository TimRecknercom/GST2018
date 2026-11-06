/* Route the legacy live-data request to the local Netlify function. */
(function redirectSantaApi(window) {
  'use strict';

  var originalOpen = XMLHttpRequest.prototype.open;
  var googleEndpoint = 'https://santa-api.appspot.com/info';

  XMLHttpRequest.prototype.open = function open(method, url) {
    if (typeof url === 'string' && url.indexOf(googleEndpoint) === 0) {
      var query = url.indexOf('?') >= 0 ? url.slice(url.indexOf('?') + 1) : '';
      var localUrl = '/.netlify/functions/santa-api?op=info';

      if (query) {
        localUrl += '&' + query;
      }
      if (window.SANTA_PREVIEW) {
        localUrl += '&now=' + encodeURIComponent(Date.now());
      }

      arguments[1] = localUrl;
    }

    return originalOpen.apply(this, arguments);
  };
})(window);
