import { SEARCH_URL } from "./apiVariables";
import GetFilmsApiService from './getFilmsApiService';
import { createListMarkup } from './renderFilms';
import { getTrendFilms } from "./getTrendFilms";

const movieAPIService = new GetFilmsApiService(SEARCH_URL);

const galleryEl = document.querySelector('.main__movie-card-list');
const formEl = document.querySelector('.header-form');
const mainBtnsEls = document.querySelector('.main__button-list');
const loaderEl = document.querySelector('.loader');

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();
    
    cleanMarkup();
    galleryEl.innerHTML = `<div class="loader"></div>`;
    loaderEl.style.display = "block";
    
    movieAPIService.query = e.currentTarget.elements.searchQuery.value;
    e.currentTarget.elements.searchQuery.value = "";

    try {
        const movieFromApi = await movieAPIService.getFilms();

        if (movieAPIService.query !== "") {

            mainBtnsEls.style.display = "none";
            
            const movieForRender = createListMarkup(movieFromApi);

            loaderEl.style.display = "none";
            return galleryEl.innerHTML = movieForRender;
            
        } else {
            
            loaderEl.style.display = "none";
            getTrendFilms();
        }

        
    } catch (error) {
        console.log(error.message);
    }

}

function cleanMarkup() {
    galleryEl.innerHTML = "";
}

// infinite scroll


