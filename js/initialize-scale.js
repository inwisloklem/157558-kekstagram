'use strict';

window.initializeScale = function (settings) {
  settings.minValue = settings.minValue || 25;
  settings.maxValue = settings.minValue || 100;
  settings.step = settings.step || 25;

  var onControlIncClick = function (evt) {
    if (settings.currentValue !== settings.maxValue) {
      settings.currentValue += settings.step;
    }
    settings.onChange(settings.currentValue);
  };

  var onControlDecClick = function (evt) {
    if (settings.currentValue !== settings.minValue) {
      settings.currentValue -= settings.step;
    }
    settings.onChange(settings.currentValue);
  };

  var addEventListeners = function () {
    settings.controlInc.addEventListener('click', onControlIncClick);
    settings.controlDec.addEventListener('click', onControlDecClick);
  };

  var removeEventListeners = function () {
    settings.controlInc.removeEventListener('click', onControlIncClick);
    settings.controlDec.removeEventListener('click', onControlDecClick);
  };

  return {
    addEventListeners: addEventListeners,
    removeEventListeners: removeEventListeners
  };
};
