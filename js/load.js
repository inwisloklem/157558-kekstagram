'use strict';

window.load = function (url, onLoad, onError) {
  var xhr = new XMLHttpRequest();

  xhr.timeout = 1000;
  xhr.responseType = 'json';

  xhr.open('GET', url);

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 404:
        onError('Не найдены данные');
        break;
      default:
        onError('Неизвестная ошибка');
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
  });

  xhr.send();
};
