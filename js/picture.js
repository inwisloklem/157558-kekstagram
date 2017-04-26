'use strict';

window.picture = function () {
  var filters = document.body.querySelector('.filters');
  var picturesContainer = document.querySelector('.pictures');

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

    window.utils.debounce(fillGallery, list);
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

    photos.forEach(function (photo) {
      fragment.appendChild(makeGalleryPicture(photo, template));
    });

    return fragment;
  };

  var fillGallery = function (photos) {
    var template = document.querySelector('#picture-template').content;
    var fragment = makeFragment(photos, template);

    picturesContainer.innerHTML = '';
    picturesContainer.appendChild(fragment);

    var pictures = document.querySelectorAll('.picture');

    var onPictureClick = function (evt) {
      evt.preventDefault();
      window.preview.setGalleryOverlay(evt);
      window.gallery.openGalleryOverlay();
    };

    pictures.forEach(function (picture) {
      picture.addEventListener('click', onPictureClick);
    });

    window.utils.showElement(filters);
  };

  return {
    fillGallery: fillGallery
  };
}();
