import { SEARCH_URL } from "./apiVariables";
import MovieApiServise from './movieAPI';
import { createMarkup } from "./createMarkup";


// Пошуковий url
const movieAPIService = new MovieApiServise(SEARCH_URL);

const galleryEl = document.querySelector('.main__movie-card-list');
const formEl = document.querySelector('.header-form');

formEl.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();
    cleanMarkup();
   
    movieAPIService.query = e.currentTarget.elements.searchQuery.value;
    
    try {
        const movieFromApi = await movieAPIService.movieSearch();
        const movieResults = movieFromApi.results;
        console.log(movieResults)

        if (movieAPIService.query !== "") {
            
            const movieForRender = createMarkup(movieResults);          

            return movieForRender;       
        }
    } catch (error) {
        console.log(error.message);
    }

}


    
    
function cleanMarkup() {
    galleryEl.innerHTML = "";
}
