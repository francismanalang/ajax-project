var $globeButton = document.querySelector('.globe-button');
var $globeContainer = document.querySelector('.globe-container');
var $atlasButton = document.querySelector('.header-button');
var $countryGenerator = document.querySelector('.generator-container');
var $countryFlag = document.querySelector('.country-flag');
var $countryName = document.querySelector('.country-name');
var $nextButton = document.querySelector('.next-button');
var $saveButton = document.querySelector('.save-button');
var $listContainer = document.querySelector('.list-container');
var $listDiv = document.querySelector('.list');

function globeButtonEvent(event) {
  nextButtonEvent();
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
    var countryValues = {
      countryFlag: countries[randomIndex].flags.png,
      countryName: countries[randomIndex].name.common
    };
    $countryFlag.setAttribute('src', countryValues.countryFlag);
    $countryName.textContent = countryValues.countryName;
    data.allCountries.unshift(countryValues);
    if (data.allCountries.length > 5) {
      data.allCountries = [];
    }
  });
  xhr.send();
}
$nextButton.addEventListener('click', nextButtonEvent);

function viewSwap(event) {
  if (event === 'globe') {
    $globeContainer.className = 'container globe-container';
    $countryGenerator.className = 'container generator-container hidden';
    $listContainer.className = 'container list-container hidden';
  } else if (event === 'country-generator') {
    $globeContainer.className = 'container globe-container hidden';
    $listContainer.className = 'container list-container hidden';
    $countryGenerator.className = 'container generator-container';
    $listContainer.className = 'container list-container hidden';
  } else if (event === 'countries-list') {
    $globeContainer.className = 'container globe-container hidden';
    $countryGenerator.className = 'container generator-container hidden';
    $listContainer.className = 'container list-container';
  }
}

function flagsContentLoaded(event) {
  for (var i = 0; i < data.saved.length; i++) {
    if (data.saved[i] !== null) {
      var listAppend = domFlagsList(data.saved[i]);
      $listDiv.appendChild(listAppend);
    }
  }

  if (data.view === 'globe') {
    viewSwap('globe');
  } else if (data.view === 'country-generator') {
    viewSwap('country-generator');
  } else if (data.view === 'countries-list') {
    viewSwap('countries-list');
  }
}

window.addEventListener('DOMContentLoaded', flagsContentLoaded);

function saveButtonEvent(event) {
  if (data.allCountries[0] !== null) {
    data.saved.unshift(data.allCountries[0]);
  }

  $listDiv.prepend(domFlagsList(data.allCountries[0]));

  viewSwap('countries-list');
  data.view = 'countries-list';
}

$saveButton.addEventListener('click', saveButtonEvent);

function domFlagsList(entry) {
  var colFullDiv = document.createElement('div');
  colFullDiv.setAttribute('class', 'column-full');

  var flagDisplayDiv = document.createElement('div');
  flagDisplayDiv.className = 'flag-display background-color';
  colFullDiv.appendChild(flagDisplayDiv);

  var flagWrapperDiv = document.createElement('div');
  flagWrapperDiv.className = 'flag-wrapper';
  flagDisplayDiv.appendChild(flagWrapperDiv);

  var flagImageElement = document.createElement('img');
  flagImageElement.className = 'list-flag';
  flagImageElement.setAttribute('alt', 'flag');
  flagImageElement.setAttribute('src', entry.countryFlag);
  flagWrapperDiv.appendChild(flagImageElement);

  return colFullDiv;
}
