const $userCurrentImg = document.querySelector('#user-img');
const $currentPhotoUrl = document.querySelector('#photo-url');
const $currentTitle = document.querySelector('#title');
const $entryForm = document.querySelector('.form-input');
const $userNotes = document.querySelector('#notes-field');
const $parent = document.querySelector('main');
const $navLink = document.querySelector('.nav-link');
const $entryLink = document.querySelector('.entry-link');

// DELETE BELOW, ONLY FOR TEST PURPOSES
// const $testAppendLoc = document.querySelector('.hidden');
// eslint-disable-next-line no-unused-vars
const $hiddenDiv = document.querySelector('.hidden-div');

// function which sets image src:
function setImgSrc(event) {
  $userCurrentImg.setAttribute('src', $currentPhotoUrl.value);
}
// listener that triggers setImgSrc function
$currentPhotoUrl.addEventListener('input', setImgSrc);

// submit function:
function submitInfo(event) {
  // prevents default form behavior:
  event.preventDefault();

  // gets form values:
  const title = $currentTitle.value;
  const url = $currentPhotoUrl.value;
  const notes = $userNotes.value;
  // assigns form values to new object
  const formData = {
    title,
    url,
    notes,
  };
  // assigns value of nextEntryId property of data object to new property entryId and adds to $formData
  formData.entryId = data.nextEntryId;
  // increments value of nextEntryId
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
  // creates elements of DOM tree:
  const $row = document.createElement('div');
  $row.className = 'row';
  const $column = document.createElement('div');
  $column.className = 'column-full';
  const $list = document.createElement('ul');
  $list.className = 'journal-entry';
  const $listItem = document.createElement('li');
  $listItem.className = 'user-entry';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.url);
  const $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  const $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;

  // append DOM nodes to build tree
  $row.appendChild($column);
  $column.appendChild($list);
  $list.appendChild($listItem);
  $listItem.appendChild($img);
  $listItem.appendChild($title);
  $listItem.appendChild($notes);

  // returns outermost div and all children
  return $row;
}

// looping function
function hersheyLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const $hershey = array[i];
    // eslint-disable-next-line no-unused-vars
    const $renderedEntry = renderEntry($hershey);
    // correct append location up top later:
    // $testAppendLoc.appendChild($renderedEntry);
  }
}

// listener for DOMContentLoaded event
document.addEventListener('DOMContentLoaded', hersheyLoop(data.entries));

// function to toggle "no entries" message, TURN THIS BACK ON LATER MAYBE
// function toggleNoEntries(event) {
//   $hiddenDiv.classList.remove('hidden');
// }

// test event listener for toggleNoEntries
// document.addEventListener('click', toggleNoEntries);

// view swapping function

function viewSwap(entries) {
  for (const child of $parent.children) {
    child.classList.toggle('hidden');
  }
}

// toggles view
$navLink.addEventListener('click', viewSwap);
$entryLink.addEventListener('click', viewSwap);
