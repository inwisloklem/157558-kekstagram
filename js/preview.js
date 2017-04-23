'use strict';

window.preview = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  var setGalleryOverlay = function (evt) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
  };

  return {
    galleryOverlay: galleryOverlay,
    galleryOverlayClose: galleryOverlayClose,
    setGalleryOverlay: setGalleryOverlay
  };
}();
