'use strict';

var purchaseButtons = document.querySelectorAll('.js-purchase');

purchaseButtons.forEach( function (element) {
  element.addEventListener('click', function (evt) {
    evt.preventDefault();
  });
});
