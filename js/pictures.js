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

function getRandomNumberFromRange(start, end) {
  return Math.floor(Math.random() * end) + start;
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

  for (var i = 0, l = getRandomNumberFromRange(1, max); i < l; i++) {
    comment1 = getRandomArrayElement(comments);
    comment2 = getRandomArrayElement(comments);

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
      'likes': getRandomNumberFromRange(settings.minLikes, settings.maxLikes),
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

document.querySelector('.upload-overlay').classList.add('invisible');

// Показ/скрытие картинки в галерее

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

var pictures = document.querySelectorAll('.picture');

var setGalleryOverlay = function (evt) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = evt.currentTarget.querySelector('img').src;
  galleryOverlay.querySelector('.likes-count').textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
};

var isKeyPressed = function (evt, code) {
  return evt.keyCode === code;
};

var onGalleryEscPress = function (evt) {
  if (isKeyPressed(evt, ESC_KEY_CODE)) {
    closeGallery();
  }
};

var openGallery = function () {
  galleryOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onGalleryEscPress);
};

var closeGallery = function () {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', onGalleryEscPress);
};

galleryOverlayClose.addEventListener('click', function () {
  closeGallery();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (isKeyPressed(evt, ENTER_KEY_CODE)) {
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
uploadForm.classList.remove('invisible');

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadDesc = uploadOverlay.querySelector('.upload-form-description');
var uploadFilterForm = document.querySelector('#upload-filter');

var onEscPress = function (evt) {
  if (isKeyPressed(evt, ESC_KEY_CODE)) {
    closeUploadOverlay();
  }
};

var openUploadOverlay = function () {
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', onEscPress);
};

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('invisible');
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
  if (isKeyPressed(evt, ESC_KEY_CODE)) {
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
  if (evt.target === resizeControlsInc && resizeControlsValue.value !== '100%') {
    resizeControlsValue.value = [parseInt(resizeControlsValue.value, 10) + 25, '%'].join('');
  } else if (evt.target === resizeControlsDec && resizeControlsValue.value !== '25%') {
    resizeControlsValue.value = [parseInt(resizeControlsValue.value, 10) - 25, '%'].join('');
  }

  imagePreview.style.transform = ['scale(', parseInt(resizeControlsValue.value, 10) / 100, ')'].join('');
};

resizeControls.addEventListener('click', function (evt) {
  if (evt.target.nodeName.toLowerCase() === 'button') {
    resizeImage(evt);
  }
});

// Выделение незаполненного поля комментария красной рамкой

var uploadDescription = uploadOverlay.querySelector('.upload-form-description');

uploadDescription.addEventListener('invalid', function (evt) {
  evt.target.style.outline = '4px solid #ff0000';
});

// Сброс на значения по умолчанию (добавлено в uploadFilterForm на событие 'submit')

var resetUploadFilterForm = function () {
  imagePreview.classList.remove(currentFilter);
  resizeControlsValue.value = '100%';
  uploadDescription.value = '';
  uploadOverlay.querySelector('#upload-filter-none').checked = true;
  uploadDescription.style.outline = 'unset';
};
