import MovieFilter from './fetchFilter';
// import { renderNewPage } from './getTrendFilms';
import { IMAGE_URL } from './apiVariables';


const genres = [
  {
    id: 28,
    name: 'Action',
  },
  {
    id: 12,
    name: 'Adventure',
  },
  {
    id: 16,
    name: 'Animation',
  },
  {
    id: 35,
    name: 'Comedy',
  },
  {
    id: 80,
    name: 'Crime',
  },
  {
    id: 99,
    name: 'Documentary',
  },
  {
    id: 18,
    name: 'Drama',
  },
  {
    id: 10751,
    name: 'Family',
  },
  {
    id: 14,
    name: 'Fantasy',
  },
  {
    id: 36,
    name: 'History',
  },
  {
    id: 27,
    name: 'Horror',
  },
  {
    id: 10402,
    name: 'Music',
  },
  {
    id: 9648,
    name: 'Mystery',
  },
  {
    id: 10749,
    name: 'Romance',
  },
  {
    id: 878,
    name: 'Science Fiction',
  },
  {
    id: 10770,
    name: 'TV Movie',
  },
  {
    id: 53,
    name: 'Thriller',
  },
  {
    id: 10752,
    name: 'War',
  },
  {
    id: 37,
    name: 'Western',
  },
];
const movieFilter = new MovieFilter();
const genresEl = document.querySelector('.filter--list__genres');
const yearsEl = document.querySelector('.filter--list__years');
const filterYears = document.querySelector('.filter--title__years');
const filterGenres = document.querySelector('.filter--title__genres');
const filterListYears = document.querySelector('.filter--list__years');
const filterListGeners = document.querySelector('.filter--list__genres');
const listEl = document.querySelector('.main__movie-card-list');
const loaderEl = document.querySelector('.loader');
const filtersEl = document.querySelector('.filters');

export let selectedGenre = [];
export let selectedYear = [];
 
setGenre();
setYear();

async function getFilerFilms() {
    await movieFilter.sortByGenre();
    loaderFilms();
    observer.observe(listEl.lastElementChild);
}

function loaderFilms() {
    loaderEl.style.display = "block";
     setTimeout(() => {
   loaderEl.style.display = "none";
  }, 1500);
}

function setGenre() {
  genresEl.innerHTML = '';
  genres.forEach(genre => {
    let t = document.createElement('li');
    t.classList.add('filter--item__genre');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      listEl.innerHTML = '';
      movieFilter.resetPage();
      if (selectedGenre.length === 0) {
          selectedGenre.push(genre.id);
          t.classList.add('filter-item__color');
      } else if (selectedGenre.includes(genre.id)) {
        selectedGenre.forEach((id, idx) => {
          if (id == genre.id) {
              selectedGenre.splice(idx, 1);
              t.classList.remove('filter-item__color');
          }
        });
      } else {
          selectedGenre.push(genre.id);
          t.classList.add('filter-item__color');
      }
      if (selectedGenre.length > 0 || selectedYear.length > 0) {
          getFilerFilms();
          renderClearBtn();
      } else {
        //   renderNewPage();
      }
    });
      genresEl.append(t);
  });
}


function setYear() {
    yearsEl.innerHTML = '';
    let startYear = 1880;
    let endYear = new Date().getFullYear();
    for (let i = endYear; i > startYear; i--) {
        let y = document.createElement('li');
        y.classList.add('filter--item__year');
        y.value = `${i}`;
        y.textContent = `${i}`;
        yearsEl.append(y);
        y.addEventListener('click', () => {
            listEl.innerHTML = '';
            movieFilter.resetPage();
            if (selectedYear.length == 0) {
                selectedYear.push(i);
                y.classList.add('filter-item__color');
            } else if (selectedYear.includes(i)) {
                selectedYear.forEach((i, idx) => {
                    if (i == i) {
                        selectedYear.splice(idx, 1);
                        y.classList.remove('filter-item__color');
                    }
                });
            } else {
                selectedYear.push(i);
                y.classList.add('filter-item__color');
            }
            console.log(selectedYear);
            if (selectedGenre.length > 0 || selectedYear.length > 0) {
                getFilerFilms();
                renderClearBtn();
            } else {
                // renderNewPage();
            }
        });
    }
}

function renderClearBtn() {
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        return;
    } else {
       let clear = document.createElement('li');
        clear.classList.add('filter', 'filter-button');
        clear.id = 'clear';
        clear.innerHTML = `<p class="filter--title filter--title__clear">CLEAR</p>` 
        filtersEl.append(clear);
    }
    clear.addEventListener('click', () => {
         selectedGenre = [];
         selectedYear = [];
        //  renderNewPage();
         filterListYears.classList.add('is-hidden');
        filterListGeners.classList.add('is-hidden');
         setYear();
         setGenre();
         
         clear.remove();
        });
};

filterYears.addEventListener('click', () => {
  filterListYears.classList.toggle('is-hidden');
  filterListGeners.classList.add('is-hidden');
});

filterGenres.addEventListener('click', () => {
  filterListGeners.classList.toggle('is-hidden');
  filterListYears.classList.add('is-hidden');
});

const options = {
  intersectionObserver: {
    root: listEl.lastElementChild,
    rootMargin: '0px 0px 200px 0px',
    threshold: 1,
  },
};

const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    observer.unobserve(entries[0].target);
    getFilerFilms();
  }
};

 const observer = new IntersectionObserver(
  callback,
  options.intersectionObserver
);

export function renderFilterList(data) {
  data.map(movie => {
    const {
      id,
      poster_path,
      original_title,
      original_name,
      genre_ids,
      release_date,
      first_air_date,
      vote_average,
    } = movie;
    let date = '';
    let name = '';

    if (release_date !== undefined) {
      date = release_date.slice(0, 4);
    } else if (first_air_date) {
      date = first_air_date.slice(0, 4);
    } else {
      date = 'Unknown';
    }

    if (original_title) {
      name = original_title;
    } else {
      name = original_name;
    }

    let posterPicture = `${IMAGE_URL + poster_path}`;
    if (poster_path === null) {
      posterPicture =
        'https://www.csaff.org/wp-content/uploads/csaff-no-poster.jpg';
    }

    const movieEL = document.createElement('li');
    movieEL.classList.add('main__movie-card-item');
    movieEL.setAttribute('data-movieId', `${id}`);
    movieEL.innerHTML = `
            <img class="main__movie-img" src="${posterPicture}" alt="${original_title}">
            <div class="main__movie-info">
                <h2 class="main__movie-title">${name}</h2>
                <p class="main__movie-genre">Genres<span class="main__movie-year">${date}</span></p>
                <p class="main__movie-raiting">${vote_average}</p>
            </div>
        `;
    listEl.append(movieEL);
  });
}
