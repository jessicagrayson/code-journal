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
  if (data.editing === null) {
    // alert('if works');
    formData.entryId = data.nextEntryId;
    // increments value of nextEntryId
    data.nextEntryId = data.nextEntryId + 1;

    // adds object to beginning of array
    data.entries.unshift(formData);

    // Resets image src
    $userCurrentImg.src = 'images/placeholder-image-square.jpg';
    // resets form
    $entryForm.reset();

    // prepends list to ul
    $list.prepend(renderEntry(formData));
  } else {
    // code for when editing goes here
    const editedEntryId = data.editing.entryId;

    // update data for edited entry
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === editedEntryId) {
        data.entries[i].title = formData.title;
        data.entries[i].url = formData.url;
        data.entries[i].notes = formData.notes;
        data.entries[i].entryId = editedEntryId;
      }
    }

    // data.entries[i].entryId === pickedEntryId

    // find corresponding DOM element for edited entry
    const $editedEntry = document.querySelector(
      `[data-entry-id="${editedEntryId}"]`
    );
    if ($editedEntry) {
      // render new DOM tree
      for (let i = 0; i < data.entries.length; i++) {
        if (data.entries[i].entryId === editedEntryId) {
          const $newRenderedEntry = renderEntry(data.entries[i]);
          $list.replaceChild($newRenderedEntry, $editedEntry);
        }
      }
    }
    // reset data.editing
    data.editing = null;
    // update title to 'new entry'
    updateTitleToNewEntry();
  }
  // automatically swaps view
  viewSwap('entries');

  // toggles "no entries" message
  toggleNoEntries();

  // resets form values TESTING
  $entryForm.reset();
  // resets img
  $userCurrentImg.src = 'images/placeholder-image-square.jpg';
}

function renderEntry(entry) {
  // creates elements of DOM tree:
  const $listItem = document.createElement('li');
  $listItem.className = 'user-entry';
  $listItem.setAttribute('data-entry-id', entry.entryId);
  const $row = document.createElement('div');
  $row.className = 'row entry-row';
  const $imgColumn = document.createElement('div');
  $imgColumn.className = 'column-half image-column';
  const $img = document.createElement('img');
  $img.setAttribute('src', entry.url);
  $img.className = 'entry-img';
  const $textColumn = document.createElement('div');
  $textColumn.className = 'column-half text-column';
  const $title = document.createElement('h2');
  $title.className = 'entry-title';
  $title.textContent = entry.title;
  const $icon = document.createElement('i');
  $icon.classList = 'fa-solid fa-pencil icon';
  $icon.setAttribute('data-entry-id', entry.entryId);
  const $notes = document.createElement('p');
  $notes.className = 'entry-notes';
  $notes.textContent = entry.notes;

  // append DOM nodes to build tree:
  $listItem.appendChild($row);
  $row.appendChild($imgColumn);
  $imgColumn.appendChild($img);
  $row.appendChild($textColumn);
  $textColumn.appendChild($title);
  $title.appendChild($icon);
  $textColumn.appendChild($notes);

  // returns li with all child elements
  $list.appendChild($listItem);
  return $listItem;
}

// looping function for renderEntry function - iterates nextEntryId
function arrayLoop(array) {
  for (let i = 0; i < array.length; i++) {
    const $entriesArray = array[i];
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
  } else {
    $noEntryMessage.classList.remove('hidden');
  }
}
// function to reset title to be utilized inside submitInfo function
function updateTitleToNewEntry() {
  const entryHeader = document.querySelector('.new-entry-header');
  entryHeader.innerHTML = 'New Entry';
}
// event listener for submit function
$entryForm.addEventListener('submit', submitInfo);

// listener for DOMContentLoaded event which calls multiple functions
document.addEventListener('DOMContentLoaded', function (event) {
  arrayLoop(data.entries);
  viewSwap(data.view);
  toggleNoEntries();
});

// viewSwap conditional statement
$navLink.addEventListener('click', function () {
  viewSwap('entries');
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

// adds event listener to ul in entries view pencil icon that viewSwaps
document.addEventListener('click', function () {
  if (event.target.classList.contains('icon')) {
    // change to entry-form view
    viewSwap('entry-form');
    // conditionally assigns data.entries values to data.editing
    editingLoop();
    // pre-populates form with existing values entered by user
    formEditing();
    // changes form title to read "edit entry"
    updateTitle();
  }
});

// iterate through data.entries
function editingLoop() {
  const pickedEntryId = parseInt(event.target.getAttribute('data-entry-id'));
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === pickedEntryId) {
      data.editing = data.entries[i];
    }
  }
}

// function to pre-populate entry form with existing values
function formEditing() {
  $currentTitle.value = data.editing.title;
  $currentPhotoUrl.value = data.editing.url;
  $userNotes.value = data.editing.notes;
  $userCurrentImg.src = data.editing.url;
}
// conditionally changes title when editing an entry
function updateTitle() {
  const entryHeader = document.querySelector('.new-entry-header');
  entryHeader.innerHTML = 'Edit Entry';
}
