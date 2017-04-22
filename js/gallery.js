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
    var errorNode = document.createElement('div');

    errorNode.style.position = 'fixed';
    errorNode.style.left = '50%';
    errorNode.style.top = '50%';
    errorNode.style.zIndex = 5;
    errorNode.style.padding = '20px 40px';
    errorNode.style.color = '#f00';
    errorNode.style.backgroundColor = '#fff';
    errorNode.style.border = '4px solid #f00';
    errorNode.style.fontSize = '18px';
    errorNode.style.transform = 'translate(-50%, -50%)';

    errorNode.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', errorNode);
  };

  window.load(URL, window.picture.fillGallery, onLoadError);

  return {
    openGalleryOverlay: openGalleryOverlay,
    closeGalleryOverlay: closeGalleryOverlay
  };
}();
