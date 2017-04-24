'use strict';

window.picture = function () {
  var filters = document.body.querySelector('.filters');

  var filterPhotos = function (evt) {
    var list;

    switch (evt.target.value) {
      case 'new':
        list = window.utils.shuffleArray(window.gallery.photosList.slice()).slice(0, 10);
        break;
      case 'discussed':
        list = window.gallery.photosList.slice().sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
        break;
      default:
        list = window.gallery.photosList;
    }

    window.setTimeout(fillGallery(list), 5000);
  };

  filters.addEventListener('click', function (evt) {
    if (evt.target.nodeName.toLowerCase() === 'input') {
      filterPhotos(evt);
    }
  });

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
    var container = document.querySelector('.pictures');

    container.innerHTML = '';
    container.appendChild(fragment);

    var pictures = document.querySelectorAll('.picture');

    var onPictureClick = function (evt) {
      evt.preventDefault();
      window.preview.setGalleryOverlay(evt);
      window.gallery.openGalleryOverlay();
    };

    for (var i = 0; i < pictures.length; i++) {
      pictures[i].addEventListener('click', onPictureClick);
    }

    window.utils.showElement(filters);
  };

  return {
    fillGallery: fillGallery
  };
}();
