'use strict';

window.utils = function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var DEBOUNCE_INTERVAL = 300;

  var isKeyPressed = function (evt, code) {
    return evt.keyCode === code;
  };

  return {
    isEscPressed: function (evt) {
      return isKeyPressed(evt, ESC_KEY_CODE);
    },
    isEnterPressed: function (evt) {
      return isKeyPressed(evt, ENTER_KEY_CODE);
    },
    getRandomNumberFromRange: function (start, end) {
      return Math.floor(Math.random() * end) + start;
    },
    getRandomArrayElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    shuffleArray: function (array) {
      return array.sort(function () {
        return 0.5 - Math.random();
      });
    },
    showElement: function (element) {
      element.classList.remove('invisible', 'hidden');
    },
    hideElement: function (element) {
      element.classList.add('invisible');
    },
    addInvalidOutline: function (element) {
      element.style.outline = '4px solid #ff0000';
    },
    removeInvalidOutline: function (element) {
      element.style.outline = 'unset';
    },
    debounce: function (fun, args) {
      var lastTimeout;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL, args);
    }
  };
}();
