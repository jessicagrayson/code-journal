// NOTE: Address w/ Shawn - entries not visible without reload, how do I make entry img square?
// That means you aren't calling renderEntry inside your submit callback function, and appending the result to the DOM

// dom queries
const $userCurrentImg = document.querySelector('#user-img');
const $currentPhotoUrl = document.querySelector('#photo-url');
const $currentTitle = document.querySelector('#title');
const $entryForm = document.querySelector('.form-input');
const $userNotes = document.querySelector('#notes-field');
const $navLink = document.querySelector('.nav-link');
const $entryLink = document.querySelector('.entry-link');
const $noEntryMessage = document.querySelector('.no-entry-message');
const $entryView = document.querySelector('[data-view=entries]');
const $formView = document.querySelector('[data-view=entry-form]');
const $list = document.querySelector('.entries-list');

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
  // assigns form values to new object using shorthand:
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

  // automatically swaps view
  viewSwap('entries');

  // toggles "no entries" message
  toggleNoEntries();

  // TEST
  renderEntry(data.entries(formData));
}

// function to render entries TEST
function renderEntry(entry) {
  // creates elements of DOM tree:
  const $listItem = document.createElement('li');
  $listItem.className = 'user-entry';
  const $row = document.createElement('div');
  $row.className = 'row entry-row';
  const $imgColumn = document.createElement('div');
  $imgColumn.className = 'column-half image-column';
  const $imgWrap = document.createElement('div');
  $imgWrap.className = 'img-container';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.url);
  $img.className = 'entry-img';
  const $textColumn = document.createElement('div');
  $textColumn.className = 'column-half text-column';
  const $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  const $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;

  // append DOM nodes to build tree:
  $listItem.appendChild($row);
  $row.appendChild($imgColumn);
  $imgColumn.appendChild($imgWrap);
  $imgWrap.appendChild($img);
  $row.appendChild($textColumn);
  $textColumn.appendChild($title);
  $textColumn.appendChild($notes);

  // returns li with all child elements
  $list.appendChild($listItem);
  return $listItem;
}

// looping function for renderEntry function - iterates nextEntryId
function arrayLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const $entriesArray = array[i];
    // eslint-disable-next-line no-unused-vars
    const $renderedEntry = renderEntry($entriesArray);
    // appends each new entry to the ul
    $list.appendChild($renderedEntry);
  }
}

// toggles "no entries" text as appropriate:
function toggleNoEntries(event) {
  const $entriesArray = data.entries;
  if ($entriesArray.length > 0) {
    $noEntryMessage.classList.add('hidden');
  }
}

// submit event listener
// $entryForm.addEventListener('submit', toggleNoEntries);
$entryForm.addEventListener('submit', submitInfo);

// listener for DOMContentLoaded event which calls multiple functions
document.addEventListener('DOMContentLoaded', function (event) {
  arrayLoop(data.entries);
  viewSwap(data.view);
  toggleNoEntries();
});

// viewSwap conditional statement
$navLink.addEventListener('click', function () {
  if (data.view === 'entries') {
    viewSwap('entry-form');
  } else {
    viewSwap('entries');
  }
});
$entryLink.addEventListener('click', function () {
  viewSwap('entry-form');
});

// function enables viewSwap
function viewSwap(viewName) {
  if (viewName === 'entry-form') {
    $entryView.classList.add('hidden');
    $formView.classList.remove('hidden');
    data.view = 'entry-form';
  } else if (viewName === 'entries') {
    $formView.classList.add('hidden');
    $entryView.classList.remove('hidden');
    data.view = 'entries';
  }
}
