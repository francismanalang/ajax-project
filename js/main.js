var $globeButton = document.querySelector('.globe-button');
var $flashFlagButton = document.querySelector('.header-button');
var $countryFlag = document.querySelector('.country-flag');
var $countryName = document.querySelector('.country-name');
var $nextButton = document.querySelector('.next-button');
var $saveButton = document.querySelector('.save-button');
var $listDiv = document.querySelector('.list');
var $listButton = document.querySelector('.list-button');
var $emptyListText = document.querySelector('.empty-list-text');
var $studyButton = document.querySelector('.study-button');
var $answerButton = document.querySelector('.answer-button');
var $backButton = document.querySelector('.back-button');
var $studyFlag = document.querySelector('.study-flag');
var $answerFlag = document.querySelector('.answer-flag');
var $answerName = document.querySelector('.answer-name');
var $studyNextButton = document.querySelector('.study-next-button');
var $view = document.querySelectorAll('.view');
var index = 0;

function globeButtonEvent(event) {
  nextButtonEvent();
  viewSwap('country-generator');
  data.view = 'globe';
}
$globeButton.addEventListener('click', globeButtonEvent);

function flashFlagButtonEvent(event) {
  viewSwap('globe');
  data.view = 'globe';
}

$flashFlagButton.addEventListener('click', flashFlagButtonEvent);

function listButtonEvent(event) {
  viewSwap('countries-list');
  data.view = 'countries-list';

  if (data.saved.length === 0) {
    $emptyListText.className = 'empty-list-text';
    $studyButton.className = 'study-button hidden';
  } else if (data.saved.length !== 0) {
    $emptyListText.className = 'empty-list-text hidden';
    $studyButton.className = 'study-button';
  }
}

$listButton.addEventListener('click', listButtonEvent);

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
    if (countryValues.countryFlag !== undefined && countryValues.countryName !== null) {
      $countryFlag.setAttribute('src', countryValues.countryFlag);
      $countryName.textContent = countryValues.countryName;
      data.allCountries.unshift(countryValues);
    }
    if (data.allCountries.length > 5) {
      data.allCountries = [];
    }
  });
  xhr.send();
}
$nextButton.addEventListener('click', nextButtonEvent);

function viewSwap(event) {
  for (var i = 0; i < $view.length; i++) {
    if (event === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

function flagsContentLoaded(event) {
  for (var i = 0; i < data.saved.length; i++) {
    if (data.saved[i] !== null && data.saved[i] !== undefined) {
      var listAppend = domFlagsList(data.saved[i]);
      $listDiv.appendChild(listAppend);
    }
  }

  if (data.saved.length === 0) {
    $emptyListText.className = 'empty-list-text';
    $studyButton.className = 'study-button hidden';
  } else if (data.saved.length !== 0) {
    $emptyListText.className = 'empty-list-text hidden';
    $studyButton.className = 'study-button';
  }

  if (data.view === 'globe') {
    viewSwap('globe');
  } else if (data.view === 'country-generator') {
    viewSwap('country-generator');
  } else if (data.view === 'countries-list') {
    viewSwap('countries-list');
  } else if (data.view === 'study-view') {
    viewSwap('study-view');
  } else if (data.view === 'answer-view') {
    viewSwap('answer-view');
  }
}

window.addEventListener('DOMContentLoaded', flagsContentLoaded);

function saveButtonEvent(event) {
  if (data.allCountries[0] !== null && data.allCountries[0] !== undefined) {
    data.saved.unshift(data.allCountries[0]);
  }

  $listDiv.prepend(domFlagsList(data.allCountries[0]));

  $emptyListText.className = 'empty-list-text hidden';
  $studyButton.className = 'study-button';

  viewSwap('countries-list');
  data.view = 'countries-list';
}

$saveButton.addEventListener('click', saveButtonEvent);

function studyButtonEvent(event) {
  index = 0;
  $studyFlag.setAttribute('src', data.saved[0].countryFlag);

  viewSwap('study-view');
  data.view = 'countries-list';
}

$studyButton.addEventListener('click', studyButtonEvent);

function studyNextButton(event) {
  if (index < data.saved.length - 1) {
    index++;
    viewSwap('study-view');
    data.view = 'countries-list';
    $studyFlag.setAttribute('src', data.saved[index].countryFlag);
  } else {
    viewSwap('countries-list');
    data.view = 'countries-list';
  }
}

$studyNextButton.addEventListener('click', studyNextButton);

function answerButtonEvent(event) {
  $answerFlag.setAttribute('src', data.saved[index].countryFlag);
  $answerName.textContent = data.saved[index].countryName;
  viewSwap('answer-view');
  data.view = 'countries-list';
}

$answerButton.addEventListener('click', answerButtonEvent);

function backButtonEvent(event) {
  viewSwap('study-view');
  data.view = 'countries-list';
}

$backButton.addEventListener('click', backButtonEvent);

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
