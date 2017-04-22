'use strict';

window.picture = function () {
  var makeGalleryPicture = function (photo, template) {
    var photoElement = template.cloneNode(true);

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes;
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

    return photoElement;
  };

  var makeFragment = function (photos, template) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(makeGalleryPicture(photos[i], template));
    }

    return fragment;
  };

  var fillGallery = function (photos) {
    var template = document.querySelector('#picture-template').content;
    var fragment = makeFragment(photos, template);

    document.querySelector('.pictures').appendChild(fragment);

    var pictures = document.querySelectorAll('.picture');

    var onPictureClick = function (evt) {
      evt.preventDefault();
      window.preview.setGalleryOverlay(evt);
      window.gallery.openGalleryOverlay();
    };

    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', onPictureClick);
    }
  };

  return {
    fillGallery: fillGallery
  };
}();
