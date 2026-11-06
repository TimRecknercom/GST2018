/*
 * Simulate the 2018 Santa Tracker clock.
 *
 * Normal mode preserves the current month, day, and time while changing only
 * the year to 2018. Preview mode starts the clock at Christmas Eve 2018 and
 * lets it continue advancing in real time:
 *   /?preview=tracker
 *   /?preview=tracker&hours=4
 */
(function simulateSantaClock(window) {
  'use strict';

  var NativeDate = window.Date;
  var params = new URLSearchParams(window.location.search);
  var previewEnabled = params.get('preview') === 'tracker';
  var previewHours = Number.parseFloat(params.get('hours'));

  if (!Number.isFinite(previewHours) || previewHours < 0 || previewHours > 25) {
    previewHours = 0.5;
  }

  var previewStart = NativeDate.UTC(2018, 11, 24, 10, 0, 0) + previewHours * 3600000;
  var previewShift = previewEnabled ? previewStart - NativeDate.now() : 0;

  function simulatedNow() {
    if (previewEnabled) {
      return NativeDate.now() + previewShift;
    }

    var current = new NativeDate();
    current.setFullYear(2018);
    return current.getTime();
  }

  function MockDate() {
    var args = Array.prototype.slice.call(arguments);

    if (!(this instanceof MockDate)) {
      return NativeDate.apply(null, args);
    }

    if (args.length === 0) {
      return new NativeDate(simulatedNow());
    }

    return new (NativeDate.bind.apply(NativeDate, [null].concat(args)))();
  }

  MockDate.prototype = NativeDate.prototype;
  MockDate.prototype.constructor = MockDate;
  Object.setPrototypeOf(MockDate, NativeDate);
  MockDate.now = simulatedNow;

  window.SANTA_PREVIEW = previewEnabled;
  window.SANTA_SIMULATED_NOW = simulatedNow;
  window.Date = MockDate;
})(window);
