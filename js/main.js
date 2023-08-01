// Will use this object later to get VALUE of input
const $userCurrentImg = document.querySelector('#user-img');
// Will get the VALUE of this object - set to currentInputValue
const $currentPhotoUrl = document.querySelector('#photo-url');

function setImgSrc(event) {
  $userCurrentImg.setAttribute('src', $currentPhotoUrl.value);
}

$currentPhotoUrl.addEventListener('input', setImgSrc);
