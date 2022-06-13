import { IMAGE_URL } from './apiVariables';
import { getGenreById } from './getGenres';
import GetFilmsApiService from './getTrendFilmsApiService';

const listEl = document.querySelector('.main__movie-card-list');

const getFilmsApiService = new GetFilmsApiService();

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

function createListMarkup(requestedFilms) {
    return requestedFilms.results.map(({ poster_path, original_title, genre_ids, release_date, first_air_date }) => {
        let date = "";
        
        if (release_date) {
            date = release_date.substr(0, 4);  
        } else {
            date = first_air_date.substr(0, 4);
        };
        
        return `
        <li class="main__movie-card-item">
            <img class="main__movie-img" src="${IMAGE_URL}${poster_path}" src='./images/movie-1.jpg' alt="${original_title}">
                <div class="main__movie-info">
                    <h2 class="main__movie-title">${original_title}</h2>
                    <p class="main__movie-genre">Genre<span class="main_movie-year">${date}</span></p>
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

const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        getTrendFilms();
  }
};
 

const observer = new IntersectionObserver(callback, options.intersectionObserver);