'use strict';

(function () {
  // Показ/скрытие формы кадрирования

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadDesc = uploadOverlay.querySelector('.upload-form-description');
  var uploadFilterForm = document.querySelector('#upload-filter');

  window.utils.showElement(uploadForm);
  window.utils.hideElement(uploadOverlay);

  var onEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    window.utils.showElement(uploadOverlay);
    document.addEventListener('keydown', onEscPress);
    filterControls.addEventListener('click', onInputClick);
    resizeControls.addEventListener('click', onButtonClick);
  };

  var closeUploadOverlay = function () {
    window.utils.hideElement(uploadOverlay);
    document.removeEventListener('keydown', onEscPress);
    filterControls.removeEventListener('click', onInputClick);
    resizeControls.removeEventListener('click', onButtonClick);
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  uploadFilterForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    closeUploadOverlay();
    resetUploadFilterForm();
  });

  uploadFilterForm.addEventListener('reset', function () {
    closeUploadOverlay();
    resetUploadFilterForm();
  });

  uploadDesc.addEventListener('keydown', function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.stopPropagation();
    }
  });

  // Применение фильтра к изображению

  var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');

  var currentFilter;

  var addFilter = function (filter) {
    imagePreview.classList.remove(currentFilter);
    if (filter !== 'none') {
      imagePreview.classList.add(filter);
      currentFilter = filter;
    }
  };

  var onInputClick = function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      addFilter('filter-' + evt.target.value);
    }
  };

  filterControls.addEventListener('click', onInputClick);

  // Изменение масштаба изображения

  var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
  var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');

  var resizeImage = function (evt) {
    var resizeValue = parseInt(resizeControlsValue.value, 10);

    if (evt.target === resizeControlsInc && resizeValue !== 100) {
      resizeValue += 25;
    } else if (evt.target === resizeControlsDec && resizeValue !== 25) {
      resizeValue -= 25;
    }

    resizeControlsValue.value = resizeValue + '%';
    imagePreview.style.transform = ['scale(', resizeValue / 100, ')'].join('');
  };

  var onButtonClick = function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'button') {
      resizeImage(evt);
    }
  };

  // Выделение незаполненного поля комментария красной рамкой

  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');

  uploadDescription.addEventListener('invalid', function (evt) {
    window.utils.addInvalidOutline(evt.target);
  });

  uploadDescription.addEventListener('input', function (evt) {
    if (uploadDescription.value.trim().length < uploadDescription.minLength) {
      window.utils.addInvalidOutline(evt.target);
    } else {
      window.utils.removeInvalidOutline(evt.target);
    }
  });

  // Сброс на значения по умолчанию (добавлено в uploadFilterForm на событие 'submit')

  var resetUploadFilterForm = function () {
    imagePreview.classList.remove(currentFilter);
    resizeControlsValue.value = '100%';
    uploadDescription.value = '';
    uploadOverlay.querySelector('#upload-filter-none').checked = true;
    window.utils.removeInvalidOutline(uploadDescription);
  };
})();
