'use strict';

var rangeSelector = document.querySelector('#before-after-range');
var beforePicture = document.querySelector('.before-after__image--before');
var afterPicture = document.querySelector('.before-after__image--after');
var beforeSwitch = document.querySelector('.range-selector__label--before');
var afterSwitch = document.querySelector('.range-selector__label--after');
var curtain = document.querySelector('.before-after__curtain');

var moveCurtain = function () {
  var delta = (rangeSelector.value - (rangeSelector.max/2))/10;
  beforePicture.style.width = (50 + delta) + '%';
  afterPicture.style.width = (50 - delta) + '%';
  curtain.style.width = (50 - delta) + '%';
}

rangeSelector.addEventListener('input', moveCurtain);

beforeSwitch.addEventListener('click', function () {
  rangeSelector.value = rangeSelector.min;
  moveCurtain();
});

afterSwitch.addEventListener('click', function () {
  rangeSelector.value = rangeSelector.max;
  moveCurtain();
});
