import { IMAGE_URL } from './apiVariables';
import GetFilmsApiService from './getFilmsApiService';

const formEl = document.querySelector('#search-form');
const listEl = document.querySelector('.main__movie-card-list');

const getFilmsApiService = new GetFilmsApiService();

getResult();

formEl.addEventListener('submit', onSearch);

function onSearch(e) { 
    e.preventDefault();

    getFilmsApiService.req = e.currentTarget.elements.searchQuery.value.trim();
    listEl.innerHTML = '';

    if (getFilmsApiService.req == '') {
        return alert("Please, enter something!");
    }

    getFilmsApiService.resetPage();
    getResult();
};

async function getResult() {
    try {
        const searchFilms = await getFilmsApiService.getFilms();
        onGetSucces(searchFilms);
    } catch (error) {
        onGetError();
    console.log(error.message);
  }
};

function onGetSucces(searchFilms) {
    console.log(searchFilms);
    listEl.insertAdjacentHTML('beforeend', createListMarkup(searchFilms));
    observer.observe(listEl.lastElementChild);
};

function onGetError(error) {
    console.log(error);
};

function createListMarkup(searchFilms) {
    return searchFilms.results.map(({ poster_path, original_title, genre_ids, release_date }) => {
        return `
        <li class="main__movie-card-item">
            <img class="main__movie-img" src="${IMAGE_URL}${poster_path}" src='./images/movie-1.jpg' alt="${original_title}">
                <div class="main__movie-info">
                    <h2 class="main__movie-title">${original_title}</h2>
                    <p class="main__movie-genre">Genre<span class="main_movie-year">${release_date.substr(0, 4)}</span></p>
                </div>
        </li>
        `
    } ).join('');
};


// infinite scroll

const options = {
  intersectionObserver: {
    root: listEl.lastElementChild,
    rootMargin: "0px 0px 200px 0px",
    threshold: 1,
  },
};

const callback = function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        getResult();
        }});
};

const observer = new IntersectionObserver(callback, options.intersectionObserver);