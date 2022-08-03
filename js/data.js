/* exported data */

var data = {
  view: 'globe',
  saved: [],
  allCountries: [],
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('flags-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function flagsStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('flags-local-storage', dataJSON);
}

window.addEventListener('beforeunload', flagsStorage);
