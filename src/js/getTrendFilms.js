import { TREND_URL } from './apiVariables';
import { getGenreById } from './getGenres';
import GetFilmsApiService from './getFilmsApiService';
import { createListMarkup } from './renderFilms';

const listEl = document.querySelector('.main__movie-card-list');

const getFilmsApiService = new GetFilmsApiService(TREND_URL);

getFilmsApiService.resetPage();
getTrendFilms();

async function getTrendFilms() {
    try {
        const requestedFilms = await getFilmsApiService.getFilms();
        onGetSucces(requestedFilms);
    } catch (error) {
        onGetError();
    console.log(error.message);
  }
};

function onGetSucces(requestedFilms) {
    listEl.insertAdjacentHTML('beforeend', createListMarkup(requestedFilms));
    observer.observe(listEl.lastElementChild);
};

function onGetError(error) {
    console.log(error);
};

// infinite scroll

const options = {
  intersectionObserver: {
    root: listEl.lastElementChild,
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  },
};

const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        getTrendFilms();
  }
};
 

const observer = new IntersectionObserver(callback, options.intersectionObserver);