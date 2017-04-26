'use strict';

window.preview = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.comments-count');

  var setGalleryOverlay = function (evt) {
    galleryOverlayImage.src = evt.currentTarget.querySelector('img').src;
    likesCount.textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
    commentsCount.textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
  };

  return {
    galleryOverlay: galleryOverlay,
    galleryOverlayClose: galleryOverlayClose,
    setGalleryOverlay: setGalleryOverlay
  };
}();
