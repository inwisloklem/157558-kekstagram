'use strict';

window.data = (function () {
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

  var generateUniqueUrlArray = function (num) {
    var urlArray = [];

    for (var i = 1; i <= num; i++) {
      urlArray.push('photos/' + i + '.jpg');
    }

    return window.utils.shuffleArray(urlArray);
  };

  var generateCommentsArray = function (comments, max) {
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
  };

  var generatePhotoObjects = function (settings) {
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
  };

  return {
    photoObjectsArray: generatePhotoObjects(photoObjectSettings)
  };
})();
