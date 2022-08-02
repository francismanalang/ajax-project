/* exported data */

var data = {
  view: 'globe',
  saved: [],
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('atlas-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function atlasStorage(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('atlas-local-storage', dataJSON);
}

window.addEventListener('beforeunload', atlasStorage);
