// убрать margin у наташи
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { getDatabase, ref, onValue } from 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyAXr3vyab8PJtuI-kO5zXVUNDPWQzN3ayY',
  authDomain: 'filmoteka-group5.firebaseapp.com',
  databaseURL:
    'https://filmoteka-group5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-group5',
  storageBucket: 'filmoteka-group5.appspot.com',
  messagingSenderId: '217077508176',
  appId: '1:217077508176:web:dbb78c93f591370ec90955',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const uid = auth.lastNotifiedUid;

import { renderNewPage } from './getTrendFilms';

const myLibBtn = document.querySelector(
  '[data-action="header-library-button"]'
);
const homeBtn = document.querySelector('[data-action="header-home-button"]');
const headerMain = document.querySelector('.header-main');
const headLib = document.querySelector('.header-main__library');
const listEl = document.querySelector('.main__movie-card-list');
const mainBtnList = document.querySelector('.main__button-list');
const headerLibraryWatchedBtn = document.querySelector(
  '#header-libraryWatched__btn'
);
const headerLibraryQueueBtn = document.querySelector(
  '#header-libraryQueue__btn'
);
let watchedDataBase = [];
let queueDataBase = [];

myLibBtn.addEventListener('click', onClickLibraryBtn);
homeBtn.addEventListener('click', onClickHomeBtn);
headerLibraryWatchedBtn.addEventListener('click', onCLickWatchedBtn);
headerLibraryQueueBtn.addEventListener('click', onClickQueueBtn);

function onClickQueueBtn() {
  listEl.innerHTML = '';

  createMurkUpLibraryList(queueDataBase);
}

function onCLickWatchedBtn() {
  listEl.innerHTML = '';

  createMurkUpLibraryList(watchedDataBase);
}

function onClickLibraryBtn(e) {
  e.preventDefault();
  headerMain.classList.add('--is-hidden');
  headLib.classList.remove('--is-hidden');
  mainBtnList.classList.add('--is-hidden');
  homeBtn.classList.remove('is-current');
  myLibBtn.classList.add('is-current');
  listEl.innerHTML = '';

  const uid = auth.lastNotifiedUid;
  const allInfo = ref(db, 'users/' + uid);

  onValue(allInfo, snapshot => {
    const data = snapshot.val();
    // console.log(data);
    watchedDataBase = data.watched;
  });
  createMurkUpLibraryList(watchedDataBase);
}

function onClickHomeBtn(e) {
  e.preventDefault();
  headerMain.classList.remove('--is-hidden');
  headLib.classList.add('--is-hidden');
  mainBtnList.classList.remove('--is-hidden');
  homeBtn.classList.add('is-current');
  myLibBtn.classList.remove('is-current');
  renderNewPage();
}

function createMurkUpLibraryList(requestedFilms) {
  for (const key in requestedFilms) {
    if (Object.hasOwnProperty.call(requestedFilms, key)) {
      const element = requestedFilms[key];
      const { movieID, title, img, genres, year } = element;

      const r = `<li class="main__movie-card-item" data-movieId="${movieID}">
        <img class="main__movie-img" src="${img}" alt="${title}">
        <div class="main__movie-info">
        <h2 class="main__movie-title" id="title-color">${title}</h2>
        <p class="main__movie-genre">${genres}<span class="main__movie-year">${year}</span></p>
        </div>
        </li>`;

      listEl.insertAdjacentHTML('beforeend', r);
    }
  }
}
