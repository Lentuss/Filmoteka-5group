import { IMAGE_URL } from './apiVariables';

export function createListMarkup(requestedFilms) {
    
    return requestedFilms.results.map(({ poster_path, original_title, genre_ids, release_date, first_air_date, vote_average }) => {
        let date = "";
        
        if (release_date !== undefined) {
            date = release_date.slice(0, 4);  
        } else {
            date = "Unknown";
        };

        let posterPicture = `${IMAGE_URL + poster_path}`;
        if (poster_path === null) {
            posterPicture = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
        } 
        
        return `
        <li class="main__movie-card-item">
            <img class="main__movie-img" src="${posterPicture}" alt="${original_title}">
            <div class="main__movie-info">
                <h2 class="main__movie-title">${original_title}</h2>
                <p class="main__movie-genre">Genre<span class="main_movie-year">${date}</span></p>
                <p class="main__movie-raiting">${vote_average}</p>
            </div>
        </li>
        `
    }).join('');
    
};
