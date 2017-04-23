'use strict';

window.gallery = function () {
  var onGalleryOverlayEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeGalleryOverlay();
    }
  };

  var openGalleryOverlay = function () {
    window.utils.showElement(window.preview.galleryOverlay);
    document.addEventListener('keydown', onGalleryOverlayEscPress);
  };

  var closeGalleryOverlay = function () {
    window.utils.hideElement(window.preview.galleryOverlay);
    document.removeEventListener('keydown', onGalleryOverlayEscPress);
  };

  window.preview.galleryOverlayClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  window.preview.galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      closeGalleryOverlay();
    }
  });

  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';

  var onLoadError = function (errorMessage) {
    var errorOverlay = document.querySelector('.error-overlay');

    errorOverlay.textContent = errorMessage;
    window.utils.showElement(errorOverlay);
  };

  window.load(URL, window.picture.fillGallery, onLoadError);

  return {
    openGalleryOverlay: openGalleryOverlay,
    closeGalleryOverlay: closeGalleryOverlay
  };
}();
