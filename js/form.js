'use strict';

(function () {
  // Показ/скрытие формы кадрирования

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadFilterForm = document.querySelector('#upload-filter');
  var uploadDesc = uploadOverlay.querySelector('.upload-form-description');

  window.utils.showElement(uploadForm);
  window.utils.hideElement(uploadOverlay);

  var onEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeUploadOverlay();
      resetUploadFilterForm();
    }
  };

  var openUploadOverlay = function () {
    window.utils.showElement(uploadOverlay);
    document.addEventListener('keydown', onEscPress);
    uploadFilterLevelPin.addEventListener('mousedown', onFilterPinMousedown);
    uploadDesc.addEventListener('invalid', onTextareaInvalid);
    uploadDesc.addEventListener('input', onTextareaInput);
    uploadDesc.addEventListener('keydown', onTextareaKeydown);
    scale.addEventListeners();
    filters.addEventListeners();
  };

  var closeUploadOverlay = function () {
    window.utils.hideElement(uploadOverlay);
    document.removeEventListener('keydown', onEscPress);
    uploadFilterLevelPin.removeEventListener('mousedown', onFilterPinMousedown);
    uploadDesc.removeEventListener('invalid', onTextareaInvalid);
    uploadDesc.removeEventListener('input', onTextareaInput);
    uploadDesc.removeEventListener('keydown', onTextareaKeydown);
    scale.removeEventListeners();
    filters.removeEventListeners();
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

  var onTextareaKeydown = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.stopPropagation();
    }
  };

  // Применение фильтра к изображению

  var uploadFilterControls = uploadOverlay.querySelector('.upload-filter-controls');
  var imagePreview = uploadOverlay.querySelector('.filter-image-preview');

  var uploadFilterLevel = uploadFilterControls.querySelector('.upload-filter-level');
  var uploadFilterLevelLine = uploadFilterLevel.querySelector('.upload-filter-level-line');
  var uploadFilterLevelVal = uploadFilterLevelLine.querySelector('.upload-filter-level-val');
  var uploadFilterLevelPin = uploadFilterLevelLine.querySelector('.upload-filter-level-pin');

  window.utils.hideElement(uploadFilterLevel);

  var onFilterPinMousedown = function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var rect = uploadFilterLevelLine.getBoundingClientRect();
    var leftLineEdge = Math.floor(rect.left);
    var rightLineEdge = Math.floor(rect.right);
    var lineWidth = rightLineEdge - leftLineEdge;
    var pixelsInPercent = lineWidth / 100;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startX - moveEvt.clientX;
      var relativePosition = lineWidth - shiftX;
      var currentPercent = Math.floor(relativePosition / pixelsInPercent);

      if (currentPercent >= 0 && currentPercent <= 100) {
        setFilterLevel(currentPercent);
        uploadFilterLevelVal.style.width = currentPercent + '%';
        uploadFilterLevelPin.style.left = currentPercent + '%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var setFilterLevel = function (percent) {
    switch (currentFilter) {
      case 'filter-chrome':
        imagePreview.style.filter = ['grayscale(', percent / 100, ')'].join('');
        break;
      case 'filter-sepia':
        imagePreview.style.filter = ['sepia(', percent / 100, ')'].join('');
        break;
      case 'filter-marvin':
        imagePreview.style.filter = ['invert(', percent, '%)'].join('');
        break;
      case 'filter-phobos':
        imagePreview.style.filter = ['blur(', percent * 3 / 100, 'px)'].join('');
        break;
      case 'filter-heat':
        imagePreview.style.filter = ['brightness(', percent * 2 / 100 + 1, ')'].join('');
        break;
    }
  };

  var setDefaultFilterLevel = function () {
    uploadFilterLevelVal.style.width = '100%';
    uploadFilterLevelPin.style.left = '100%';
    imagePreview.style.filter = '';
  };

  var currentFilter;

  var addFilter = function (filter) {
    setDefaultFilterLevel();
    imagePreview.classList.remove(currentFilter);
    if (filter !== 'filter-none') {
      imagePreview.classList.add(filter);
      window.utils.showElement(uploadFilterLevel);
      currentFilter = filter;
    } else {
      window.utils.hideElement(uploadFilterLevel);
    }
  };

  var filtersSettings = {
    container: uploadFilterControls,
    onChange: addFilter
  };

  var filters = window.initializeFilters(filtersSettings);

  // Изменение масштаба изображения

  var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');

  var resizeImage = function (value) {
    resizeControlsValue.value = value + '%';
    imagePreview.style.transform = ['scale(', value / 100, ')'].join('');
  };

  var scaleSettings = {
    controlInc: resizeControlsInc,
    controlDec: resizeControlsDec,
    currentValue: parseInt(resizeControlsValue.value, 10),
    onChange: resizeImage
  };

  var scale = window.initializeScale(scaleSettings);

  // Выделение незаполненного поля комментария красной рамкой

  var onTextareaInvalid = function (evt) {
    window.utils.addInvalidOutline(evt.target);
  };

  var onTextareaInput = function (evt) {
    if (uploadDesc.value.trim().length < uploadDesc.minLength) {
      window.utils.addInvalidOutline(evt.target);
    } else {
      window.utils.removeInvalidOutline(evt.target);
    }
  };

  // Сброс на значения по умолчанию (добавлено в uploadFilterForm на событие 'submit')

  var resetUploadFilterForm = function () {
    imagePreview.classList.remove(currentFilter);
    resizeControlsValue.value = '100%';
    imagePreview.style.transform = 'scale(1)';
    scaleSettings.currentValue = 100;
    uploadDesc.value = '';
    uploadOverlay.querySelector('#upload-filter-none').checked = true;
    window.utils.removeInvalidOutline(uploadDesc);
  };
})();
