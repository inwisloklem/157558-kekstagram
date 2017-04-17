'use strict';

window.initializeFilters = function (container, callback) {
  var onInputClick = function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      callback('filter-' + evt.target.value);
    }
  };
  container.addEventListener('click', onInputClick);
};
