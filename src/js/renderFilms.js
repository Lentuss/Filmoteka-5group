import { IMAGE_URL } from './apiVariables';

export function createListMarkup(requestedFilms) {
    console.log(requestedFilms)
    
    return requestedFilms.results.map(({ poster_path, original_title, genre_ids, release_date, first_air_date, vote_average }) => {
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
                    <p class="main__movie-raiting">${vote_average}</p>
                </div>
        </li>
        `
    } ).join('');
};