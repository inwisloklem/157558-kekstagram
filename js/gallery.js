'use strict';

(function () {
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

  window.picture.fillGallery(window.data.photoObjectsArray);

  var pictures = document.querySelectorAll('.picture');

  var onPictureClick = function (evt) {
    evt.preventDefault();
    window.preview.setGalleryOverlay(evt);
    openGalleryOverlay();
  };

  for (var i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', onPictureClick);
  }
})();
