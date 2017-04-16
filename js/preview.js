'use strict';

window.preview = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  var makeMainPicture = function (photo) {
    galleryOverlay.querySelector('img').src = photo.url;
    galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
  };

  var setGalleryOverlay = function (evt) {
    galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
    galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
  };

  makeMainPicture(window.data.photoObjectsArray[0]);

  return {
    galleryOverlay: galleryOverlay,
    galleryOverlayClose: galleryOverlayClose,
    setGalleryOverlay: setGalleryOverlay
  };
}();
