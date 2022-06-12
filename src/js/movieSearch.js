import { IMAGE_URL, SEARCH_URL } from "./apiVariables";
import MovieApiServise from './movieAPI';
import { getGenreById } from './getGenres';

// Пошуковий url
const movieAPIService = new MovieApiServise(SEARCH_URL);

const formEl = document.querySelector('.header-form');
const galleryEl = document.querySelector('.main__movie-card-list');

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
            
            const movieForRender = await createMarkup(movieResults);          

            return movieForRender;       
        }
    } catch (error) {
        console.log(error.message);
    }

}

function createMarkup(moviesArray) {
    if (moviesArray.length === 0) {
        const headerContainerEl = document.querySelector('.header-container');
        const failedSearch = document.createElement("p");
        failedSearch.classList.add("header__failed-search-msg");
        failedSearch.textContent = "Search result not successful. Enter the correct movie name";
        headerContainerEl.append(failedSearch);
    }

    const markup = moviesArray.map(movie => {
        

        // console.log(movie);
        const posterPath = movie.backdrop_path;
        let posterPicture =  `${IMAGE_URL + posterPath}`;
        let movieYear = movie.release_date.slice(0, 4);
        if (movie.release_date === "") {
            movieYear = "Unknown"
        }

        const movieTitle = movie.title;
          
        if (posterPath === null) {
            posterPicture = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
        } 

        // const genreIds = movie.genre_ids;
        // const genresArray = genreIds.map(genreId => {
        //     return getGenreById(genreId);
        // });

        // console.log(genresArray);
        // let genreList = "";

        // if (genresArray.length > 2) {
        //     const [firstGenre, secondGenre, ...othersGenres] = genresArray;

        //     genreList = `${firstGenre.charAt(0).toUpperCase() + firstGenre.slice(1)}, ${secondGenre.charAt(0).toUpperCase() + secondGenre.slice(1)}, Other`;
            
        // }

        return `
                <li class="main__movie-card-item">
                    <img class="main__movie-img" src="${posterPicture}" alt="Movie poster">
                    <div class="main__movie-info">
                        <h2 class="main__movie-title">${movieTitle}</h2>
                        <p class="main__movie-genre">CAAAAAAT<span class="main_movie-year">${movieYear}</span></p>
                    </div>
                </li>
        `}).join('');
        
        galleryEl.insertAdjacentHTML('beforeend', markup);
}
    
    
function cleanMarkup() {
    galleryEl.innerHTML = "";
}
