/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

// function to serialize and then store form data as JSON
function serialzeData(event) {
  const dataString = JSON.stringify('data');
  const dataStorageKey = 'serializedData';

  localStorage.setItem(dataStorageKey, dataString);
}

window.addEventListener('beforeunload', serialzeData);
