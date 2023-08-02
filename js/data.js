/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

// function to serialize and then store form data as JSON
function serializeData(event) {
  const dataString = JSON.stringify(data);
  const dataStorageKey = 'serializedData';

  localStorage.setItem(dataStorageKey, dataString);
}

window.addEventListener('beforeunload', serializeData);

// conditional statement to parse JSON data if present and assign to data variable

const dataStorageKey = 'serializedData';
const storedDataString = localStorage.getItem(dataStorageKey);

if (storedDataString) {
  data = JSON.parse(storedDataString);
}
