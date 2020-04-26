'use strict';

var menu = document.querySelector('.main-menu__list');
menu.classList.remove('main-menu__list--open');

var menuButton = document.querySelector('.main-menu__toggle');
menuButton.addEventListener('click', function (evt) {
  evt.currentTarget.classList.toggle('main-menu__toggle--close');
  menu.classList.toggle('main-menu__list--open');
});
