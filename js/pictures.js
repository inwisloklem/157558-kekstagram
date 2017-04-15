'use strict';

// Параметры для генерации объектов

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var photoObjectSettings = {
  'num': 25,
  'minLikes': 15,
  'maxLikes': 200,
  'maxComments': 10
};

// Генерация объектов для последующего создания элементов на основе шаблона

function generateUniqueUrlArray(num) {
  var urlArray = [];

  for (var i = 1; i <= num; i++) {
    urlArray.push('photos/' + i + '.jpg');
  }

  return urlArray.sort(function () {
    return 0.5 - Math.random();
  });
}

function generateCommentsArray(comments, max) {
  var commentsArray = [];

  var comment1;
  var comment2;

  for (var i = 0, l = window.utils.getRandomNumberFromRange(1, max); i < l; i++) {
    comment1 = window.utils.getRandomArrayElement(comments);
    comment2 = window.utils.getRandomArrayElement(comments);

    if (Math.random() > 0.5) {
      if (comment1 === comment2) {
        commentsArray.push(comment1);
      } else {
        commentsArray.push([comment1, comment2].join(' '));
      }
    } else {
      commentsArray.push(comment1);
    }
  }

  return commentsArray;
}

function generatePhotoObjects(settings) {
  var photos = [];
  var urls = generateUniqueUrlArray(settings.num);

  for (var i = 0; i < settings.num; i++) {
    photos.push({
      'url': urls[i],
      'likes': window.utils.getRandomNumberFromRange(settings.minLikes, settings.maxLikes),
      'comments': generateCommentsArray(COMMENTS, settings.maxComments)
    });
  }

  return photos;
}

var photoObjectsArray = generatePhotoObjects(photoObjectSettings);

// Отрисовка элементов на основе объектов из массива, создание фрагмента и добавление в DOM

function makeGalleryPicture(photo, template) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture-likes').textContent = photo.likes;
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

  return photoElement;
}

function makeFragment(photos, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(makeGalleryPicture(photos[i], template));
  }

  return fragment;
}

function fillGallery(photos) {
  var template = document.querySelector('#picture-template').content;
  var fragment = makeFragment(photos, template);

  document.querySelector('.pictures').appendChild(fragment);
}

function makeMainPicture(photo) {
  var galleryOverlay = document.querySelector('.gallery-overlay');

  galleryOverlay.querySelector('img').src = photo.url;
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
}

fillGallery(photoObjectsArray);
makeMainPicture(photoObjectsArray[0]);

var uploadOverlay = document.querySelector('.upload-overlay');
window.utils.hideElement(uploadOverlay);

// Показ/скрытие картинки в галерее

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

var pictures = document.querySelectorAll('.picture');

var setGalleryOverlay = function (evt) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
};

var onGalleryEscPress = function (evt) {
  if (window.utils.isEscPressed(evt)) {
    closeGallery();
  }
};

var openGallery = function () {
  window.utils.showElement(galleryOverlay);
  document.addEventListener('keydown', onGalleryEscPress);
};

var closeGallery = function () {
  window.utils.hideElement(galleryOverlay);
  document.removeEventListener('keydown', onGalleryEscPress);
};

galleryOverlayClose.addEventListener('click', function () {
  closeGallery();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (window.utils.isEnterPressed(evt)) {
    closeGallery();
  }
});

var onPictureClick = function (evt) {
  evt.preventDefault();
  setGalleryOverlay(evt);
  openGallery();
};

for (var i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener('click', onPictureClick);
}

// Показ/скрытие формы кадрирования

var uploadForm = document.querySelector('#upload-select-image');
window.utils.showElement(uploadForm);

var uploadFile = uploadForm.querySelector('#upload-file');
var uploadDesc = uploadOverlay.querySelector('.upload-form-description');
var uploadFilterForm = document.querySelector('#upload-filter');

var onEscPress = function (evt) {
  if (window.utils.isEscPressed(evt)) {
    closeUploadOverlay();
  }
};

var openUploadOverlay = function () {
  window.utils.showElement(uploadOverlay);
  document.addEventListener('keydown', onEscPress);
};

var closeUploadOverlay = function () {
  window.utils.hideElement(uploadOverlay);
  document.removeEventListener('keydown', onEscPress);
};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});

uploadFilterForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  closeUploadOverlay();
  resetUploadFilterForm();
});

uploadFilterForm.addEventListener('reset', function () {
  closeUploadOverlay();
  resetUploadFilterForm();
});

uploadDesc.addEventListener('keydown', function (evt) {
  if (window.utils.isEscPressed(evt)) {
    evt.stopPropagation();
  }
});

// Применение фильтра к изображению

var filterControls = uploadOverlay.querySelector('.upload-filter-controls');
var imagePreview = uploadOverlay.querySelector('.filter-image-preview');

var currentFilter;

var addFilter = function (filter) {
  imagePreview.classList.remove(currentFilter);
  if (filter !== 'none') {
    imagePreview.classList.add(filter);
    currentFilter = filter;
  }
};

filterControls.addEventListener('click', function (evt) {
  if (evt.target.nodeName.toLowerCase() === 'input') {
    addFilter('filter-' + evt.target.value);
  }
});

// Изменение масштаба изображения

var resizeControls = uploadOverlay.querySelector('.upload-resize-controls');
var resizeControlsValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var resizeControlsInc = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeControlsDec = uploadOverlay.querySelector('.upload-resize-controls-button-dec');

var resizeImage = function (evt) {
  var resizeValue = parseInt(resizeControlsValue.value, 10);

  if (evt.target === resizeControlsInc && resizeValue !== 100) {
    resizeValue += 25;
  } else if (evt.target === resizeControlsDec && resizeValue !== 25) {
    resizeValue -= 25;
  }

  resizeControlsValue.value = resizeValue + '%';
  imagePreview.style.transform = ['scale(', resizeValue / 100, ')'].join('');
};

resizeControls.addEventListener('click', function (evt) {
  if (evt.target.nodeName.toLowerCase() === 'button') {
    resizeImage(evt);
  }
});

// Выделение незаполненного поля комментария красной рамкой

var uploadDescription = uploadOverlay.querySelector('.upload-form-description');

uploadDescription.addEventListener('invalid', function (evt) {
  window.utils.addInvalidOutline(evt.target);
});

uploadDescription.addEventListener('input', function (evt) {
  if (uploadDescription.value.trim().length < uploadDescription.minLength) {
    window.utils.addInvalidOutline(evt.target);
  } else {
    window.utils.removeInvalidOutline(evt.target);
  }
});

// Сброс на значения по умолчанию (добавлено в uploadFilterForm на событие 'submit')

var resetUploadFilterForm = function () {
  imagePreview.classList.remove(currentFilter);
  resizeControlsValue.value = '100%';
  uploadDescription.value = '';
  uploadOverlay.querySelector('#upload-filter-none').checked = true;
  window.utils.removeInvalidOutline(uploadDescription);
};
