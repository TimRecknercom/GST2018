/* Unlock every Santa's Village activity after the app initializes. */
(function unlockAllGames(document, window) {
  'use strict';

  var attempts = 0;
  var maxAttempts = 240;
  var timer = window.setInterval(function () {
    var app = document.getElementById('santaApp');

    if (app && typeof app.unlockAllHouses === 'function') {
      app.unlockAllHouses();
      window.clearInterval(timer);
    } else if (++attempts > maxAttempts) {
      window.clearInterval(timer);
    }
  }, 250);
})(document, window);
