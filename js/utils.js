'use strict';

window.utils = function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

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
      if (element.classList.contains('invisible')) {
        element.classList.remove('invisible');
      } else if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
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
    debounce: function (fun) {
      var lastTimeout;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, 100000);
    }
  };
}();
