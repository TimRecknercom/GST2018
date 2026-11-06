/* Local fallback countdown for the 2018 Santa Tracker header. */
(function createCountdown(window, document) {
  'use strict';

  var TAKEOFF = Date.UTC(2018, 11, 24, 10, 0, 0);
  var UNITS = [
    { label: 'Days', divisor: 86400 },
    { label: 'Hrs', divisor: 3600 },
    { label: 'Min', divisor: 60 },
    { label: 'Sec', divisor: 1 }
  ];
  var countdownElement;
  var numberElements = [];

  function findDeep(root, selector) {
    var match = root.querySelector(selector);
    if (match) return match;

    var elements = root.querySelectorAll('*');
    for (var i = 0; i < elements.length; i += 1) {
      if (elements[i].shadowRoot) {
        match = findDeep(elements[i].shadowRoot, selector);
        if (match) return match;
      }
    }
    return null;
  }

  function pad(value) {
    return value < 10 ? '0' + value : String(value);
  }

  function buildCountdown() {
    countdownElement = document.createElement('div');
    countdownElement.id = 'cd2018';
    countdownElement.setAttribute('aria-hidden', 'true');

    UNITS.forEach(function (unit) {
      var wrapper = document.createElement('div');
      var number = document.createElement('span');
      var label = document.createElement('span');

      wrapper.className = 'countdown-unit';
      number.className = 'countdown-number';
      label.className = 'countdown-label';
      label.textContent = unit.label;

      wrapper.appendChild(number);
      wrapper.appendChild(label);
      countdownElement.appendChild(wrapper);
      numberElements.push(number);
    });
  }

  function updateCountdown() {
    var chrome = findDeep(document, 'santa-chrome');
    var title = chrome && chrome.shadowRoot && chrome.shadowRoot.getElementById('title');
    if (!title) return;

    var nativeCountdown = title.querySelector('countdown-timer');
    var nativeVisible = nativeCountdown && !nativeCountdown.hidden && nativeCountdown.offsetWidth > 0;
    var secondsLeft = Math.max(0, Math.floor((TAKEOFF - Date.now()) / 1000));

    if (!countdownElement) buildCountdown();
    if (countdownElement.parentNode !== title) title.appendChild(countdownElement);

    countdownElement.hidden = nativeVisible || secondsLeft === 0;

    var remaining = secondsLeft;
    numberElements[0].textContent = pad(Math.floor(remaining / UNITS[0].divisor));
    remaining %= 86400;
    numberElements[1].textContent = pad(Math.floor(remaining / UNITS[1].divisor));
    remaining %= 3600;
    numberElements[2].textContent = pad(Math.floor(remaining / UNITS[2].divisor));
    numberElements[3].textContent = pad(remaining % 60);
  }

  window.setInterval(updateCountdown, 1000);
  updateCountdown();
})(window, document);
