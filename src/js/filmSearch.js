import { SEARCH_URL } from "./apiVariables";
import GetFilmsApiService from './getFilmsApiService';
import { createListMarkup } from './renderFilms';

const movieAPIService = new GetFilmsApiService(SEARCH_URL);
const galleryEl = document.querySelector('.main__movie-card-list');
const formEl = document.querySelector('.header-form');

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();
    cleanMarkup();
   
    movieAPIService.query = e.currentTarget.elements.searchQuery.value;

    try {
        const movieFromApi = await movieAPIService.getFilms();
        
        if (movieAPIService.query !== "") {
            
            const movieForRender = createListMarkup(movieFromApi); 
                        
            return galleryEl.insertAdjacentHTML('beforeend', movieForRender);
        }
    } catch (error) {
        console.log(error.message);
    }
}
    
function cleanMarkup() {
    galleryEl.innerHTML = "";
}
