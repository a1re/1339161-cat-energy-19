'use strict';

var menu = document.querySelector('.main-menu__list');
var menuButton = document.querySelector('.main-menu__toggle');
var toggleMenu = function () {
  menuButton.classList.toggle('main-menu__toggle--close');
  menu.classList.toggle('main-menu__list--open');
};
toggleMenu();

menuButton.addEventListener('click', toggleMenu);
