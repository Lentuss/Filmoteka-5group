// убрать margin у наташи

const myLibBtn = document.querySelector(
  '[data-action="header-library-button"]'
);
// console.log(myLibBtn);

myLibBtn.addEventListener('click', onClickLibraryBtn);

function onClickLibraryBtn(e) {
  e.preventDefault();
  console.log(e);
}

function renderLibrary() {}
