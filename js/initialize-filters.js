'use strict';

window.initializeFilters = function (settings) {
  var onInputClick = function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      settings.onChange('filter-' + evt.target.value);
    }
  };

  var addEventListeners = function () {
    settings.container.addEventListener('click', onInputClick);
  };

  var removeEventListeners = function () {
    settings.container.removeEventListener('click', onInputClick);
  };

  return {
    addEventListeners: addEventListeners,
    removeEventListeners: removeEventListeners
  };
};
