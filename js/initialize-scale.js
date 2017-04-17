'use strict';

window.initializeScale = function (controlInc, controlDec, currentValue, min, max, step, callback) {
  var onControlIncClick = function (evt) {
    if (currentValue !== max) {
      currentValue += step;
    }
    callback(currentValue);
  };

  var onControlDecClick = function (evt) {
    if (currentValue !== min) {
      currentValue -= step;
    }
    callback(currentValue);
  };

  controlInc.addEventListener('click', onControlIncClick);
  controlDec.addEventListener('click', onControlDecClick);
};
