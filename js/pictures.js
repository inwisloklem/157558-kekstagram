'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var photoObjectSettings = {
  'urls': 25,
  'minLikes': 15,
  'maxLikes': 200,
  'maxComments': 10
};

function checkDuplicates(array) {
  for (var i = 0, l = array.length; i < l; i++) {
    for (var j = i; j < l; j++) {
      if (i !== j && array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
}

function getRandomNumberFromRange(start, end) {
  return Math.floor(Math.random() * end) + start;
}

function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateUrl(num) {
  return 'photos/' + getRandomNumberFromRange(1, num) + '.jpg';
}

function generateUniqueUrlArray(num) {
  do {
    var urlArray = [];

    for (var i = 0; i < num; i++) {
      urlArray.push(generateUrl(num));
    }
  } while (checkDuplicates(urlArray));

  return urlArray;
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

function generatePhotoObjects(num, settings) {
  var photos = [];
  // var urls = generateUniqueUrlArray(settings.urls);

  for (var i = 0; i < num; i++) {
    photos.push({
      'url': generateUrl(settings.urls), // urls[i]
      'likes': getRandomNumberFromRange(settings.minLikes, settings.maxLikes),
      'comments': generateCommentsArray(COMMENTS, settings.maxComments)
    });
  }

  return photos;
}

function renderPicture(photo, template) {
  var photoElement = template.cloneNode(true);

  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture-likes').textContent = photo.likes;
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length;

  return photoElement;
}

function makeFragment(photos, template) {
  var fragment = document.createDocumentFragment();

  for (var i = 0, l = photos.length; i < l; i++) {
    fragment.appendChild(renderPicture(photos[i], template));
  }

  return fragment;
}

var pictureTemplate = document.querySelector('#picture-template').content;
var photoObjectsArray = generatePhotoObjects(25, photoObjectSettings);

var fragmentPictures = makeFragment(photoObjectsArray, pictureTemplate);

document.querySelector('.pictures').appendChild(fragmentPictures);
document.querySelector('.upload-overlay').classList.add('invisible');

var galleryOverlay = document.querySelector('.gallery-overlay');

galleryOverlay.querySelector('img').src = photoObjectsArray[0].url;
galleryOverlay.querySelector('.likes-count').textContent = photoObjectsArray[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = photoObjectsArray[0].comments.length;
galleryOverlay.classList.remove('invisible');

// console.log(photoObjectsArray);
