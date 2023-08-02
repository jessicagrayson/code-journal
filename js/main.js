const $userCurrentImg = document.querySelector('#user-img');
const $currentPhotoUrl = document.querySelector('#photo-url');
const $currentTitle = document.querySelector('#title');
const $entryForm = document.querySelector('.form-input');
const $userNotes = document.querySelector('#notes-field');
// DELETE BELOW, ONLY FOR TEST PURPOSES
const $testAppendLoc = document.querySelector('.hidden');

function setImgSrc(event) {
  $userCurrentImg.setAttribute('src', $currentPhotoUrl.value);
}

$currentPhotoUrl.addEventListener('input', setImgSrc);

// submit function

function submitInfo(event) {
  // prevents default form behavior:
  event.preventDefault();

  // gets form values:
  const title = $currentTitle.value;
  const url = $currentPhotoUrl.value;
  const notes = $userNotes.value;
  // assigns form values to new object
  const formData = {
    // this is using shorthand that allows you to just type out the name one time if your key and value are called the same thing.
    title,
    url,
    notes,
  };
  // assigns value of nextEntryId property of data object to new property entryId and adds to $formData
  formData.entryId = data.nextEntryId;
  // // increments the nextEntryId property of the data model
  data.nextEntryId = data.nextEntryId + 1;

  // adds object to beginning of array
  data.entries.unshift(formData);

  // Resets image src
  $userCurrentImg.src = 'images/placeholder-image-square.jpg';
  // resets form
  $entryForm.reset();
}

// submit event listener
$entryForm.addEventListener('submit', submitInfo);

// function to render entries
// eslint-disable-next-line no-unused-vars
function renderEntry(entry) {
  // builds elements of DOM tree:
  const $row = document.createElement('div');
  $row.className = 'row';
  // create column NOTE TO SELF: (may need to change class name)
  const $column = document.createElement('div');
  $column.className = 'column-full';
  // creates list
  const $list = document.createElement('ul');
  $list.className = 'journal-entry';
  // creates li to append properties to
  const $listItem = document.createElement('li');
  $listItem.className = 'user-entry';
  // NOTE TO SELF: possible need for a div or container here, think $pokemonCard div?
  // creates image
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.url);
  // NOTE TO SELF: may need to change image value
  // creates title
  const $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  // creates notes section
  const $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;
  // append DOM nodes

  $row.appendChild($column);
  $column.appendChild($list);
  $list.appendChild($listItem);
  $listItem.appendChild($img);
  $listItem.appendChild($title);
  $listItem.appendChild($notes);

  // NOTE TO SELF: return needed?
  return $row;
}

// event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', hersheyLoop(data.entries));

// looping function

function hersheyLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const $hershey = array[i];
    const $renderedEntry = renderEntry($hershey);
    // correct append location later:
    $testAppendLoc.appendChild($renderedEntry);
  }
}
