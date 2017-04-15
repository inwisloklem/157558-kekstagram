'use strict';

(function () {
  var onGalleryEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      closeGallery();
    }
  };

  var openGallery = function () {
    window.utils.showElement(window.preview.galleryOverlay);
    document.addEventListener('keydown', onGalleryEscPress);
  };

  var closeGallery = function () {
    window.utils.hideElement(window.preview.galleryOverlay);
    document.removeEventListener('keydown', onGalleryEscPress);
  };

  window.preview.galleryOverlayClose.addEventListener('click', function () {
    closeGallery();
  });

  window.preview.galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      closeGallery();
    }
  });

  var pictures = document.querySelectorAll('.picture');

  var onPictureClick = function (evt) {
    evt.preventDefault();
    window.preview.setGalleryOverlay(evt);
    openGallery();
  };

  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', onPictureClick);
  }
})();
