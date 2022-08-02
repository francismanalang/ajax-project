var $globeButton = document.querySelector('.globe-button');
var $globeContainer = document.querySelector('.globe-container');
var $atlasButton = document.querySelector('.header-button');
var $countryGenerator = document.querySelector('.generator-container');
var $countryFlag = document.querySelector('.country-flag');
var $countryName = document.querySelector('.country-name');
var $nextButton = document.querySelector('.next-button');

function globeButtonEvent(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.com/v3.1/all');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var countries = xhr.response;
    var randomIndex = Math.floor(Math.random() * countries.length);
    $countryFlag.setAttribute('src', countries[randomIndex].flags.png);
    $countryName.innerHTML = countries[randomIndex].name.common;
  });
  xhr.send();
  viewSwap('country-generator');
  data.view = 'globe';
}
$globeButton.addEventListener('click', globeButtonEvent);

function atlasButtonEvent(event) {
  viewSwap('globe');
  data.view = 'globe';
}

$atlasButton.addEventListener('click', atlasButtonEvent);

function nextButtonEvent(event) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://restcountries.com/v3.1/all');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var countries = xhr.response;
    var randomIndex = Math.floor(Math.random() * countries.length);
    $countryFlag.setAttribute('src', countries[randomIndex].flags.png);
    $countryName.innerHTML = countries[randomIndex].name.common;
  });
  xhr.send();
}
$nextButton.addEventListener('click', nextButtonEvent);

function viewSwap(event) {
  if (event === 'globe') {
    $globeContainer.className = 'container globe-container';
    $countryGenerator.className = 'container generator-container hidden';
  } else if (event === 'country-generator') {
    $globeContainer.className = 'container globe-container hidden';
    $countryGenerator.className = 'container generator-container';
  }
}

function atlasContentLoaded(event) {
  if (data.view === 'globe') {
    $globeContainer.className = 'container globe-container';
    $countryGenerator.className = 'container generator-container hidden';
  } else if (data.view === 'country-generator') {
    $globeContainer.className = 'container globe-container hidden';
    $countryGenerator.className = 'container generator-container';
  }
}

window.addEventListener('DOMContentLoaded', atlasContentLoaded);
