// убрать margin у наташи

const myLibBtn = document.querySelector(
  '[data-action="header-library-button"]'
);
const homeBtn = document.querySelector('[data-action="header-home-button"]');
const headerMain = document.querySelector('.header-main');
const headLib = document.querySelector('.header-main__library');
const mainCont = document.querySelector('#main-container');

myLibBtn.addEventListener('click', onClickLibraryBtn);
// homeBtn.addEventListener('click', onClickHomeBtn);

function onClickLibraryBtn(e) {
  e.preventDefault();
  headerMain.classList.add('--is-hidden');
  headLib.classList.remove('--is-hidden');
  homeBtn.classList.remove('is-current');
  myLibBtn.classList.add('is-current');
  mainCont.innerHTML = '';
}

function onClickHomeBtn(e) {
  e.preventDefault();
  headerMain.classList.remove('--is-hidden');
  headLib.classList.add('--is-hidden');
  homeBtn.classList.add('is-current');
  myLibBtn.classList.remove('is-current');
}
