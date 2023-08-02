const $userCurrentImg = document.querySelector('#user-img');
const $currentPhotoUrl = document.querySelector('#photo-url');
const $currentTitle = document.querySelector('#title');
const $entryForm = document.querySelector('.form-input');
const $userNotes = document.querySelector('#notes-field');
// DELETE BELOW, ONLY FOR TEST PURPOSES
const $testAppendLoc = document.querySelector('.container');

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
  $img.setAttribute('src', $currentPhotoUrl.value);
  // NOTE TO SELF: may need to change image value
  // creates title
  const $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = $currentTitle.value;
  // creates notes section
  const $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = $userNotes.value;
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
document.addEventListener('DOMContentLoaded', hersheyLoop);

// looping function

function hersheyLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const $hershey = array[i];
    const $renderedEntry = renderEntry($hershey);
    // correct append location later:
    $testAppendLoc.appendChild($renderedEntry);
  }
}

// 1 Need to first create a function that will render our entry.
// It should accept one entry as the parameter and inside of the function it should generate and
// return a DOM tree for that entry. Have to manually create each node of the tree (row, column, ul, etc)
// and append each of them to the prior one.
// Should then return a DOM tree (should only require returning outermost div)

// 2 Need to create an event listener which listens for the DOMContentLoaded event.
// The callback function of this event should loop through the data.entries array, grab each entry and
// then generate a DOM tree for each entry and then append that DOM tree to our ul.
// In short, each entry should be rendered (done by using prior function in this loop) and they
// should all be appended to the same ul element.
