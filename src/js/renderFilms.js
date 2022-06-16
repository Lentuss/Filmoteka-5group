import { IMAGE_URL } from './apiVariables';

const failedSearch = document.querySelector('.search-error');

export function createListMarkup(requestedFilms) {
    
    if (requestedFilms.results.length === 0) {
        failedSearch.classList.remove("visually-hidden");
    } else {
        failedSearch.classList.add("visually-hidden");
    }
    
    return requestedFilms.results.map(({ poster_path, original_title, original_name, genre_ids, release_date, first_air_date, vote_average }) => {
        
        let date = '';
        let name = '';
        
        // if (release_date !== undefined) {
        //     date = release_date.slice(0, 4);  
        // } else if (release_date === undefined) {
        //     date = first_air_date.slice(0, 4);
        // };

        if (original_title) {
            name = original_title;  
        } else {
            name = original_name;
        };
        
         
        if (release_date !== undefined) {
            date = release_date.slice(0, 4);  
        } else {
            date = "Unknown";
        };

        let posterPicture = `${IMAGE_URL + poster_path}`;
        if (poster_path === null) {
            posterPicture = "https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg";
        } 
        
        return `
        <li class="main__movie-card-item">
            <img class="main__movie-img" src="${posterPicture}" alt="${original_title}">
            <div class="main__movie-info">
                <h2 class="main__movie-title">${name}</h2>
                <p class="main__movie-genre">Genre<span class="main_movie-year">${date}</span></p>
                <p class="main__movie-raiting">${vote_average}</p>
            </div>
        </li>
        `
    }).join('');
    
};

