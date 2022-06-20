import MovieFilter from './fetchFilter';
import { renderNewPage } from './getTrendFilms';
import { IMAGE_URL } from './apiVariables';
import { createListMarkup } from './renderFilms';

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
const mainBtnsEls = document.querySelector('.main__button-list');

export let selectedGenre = [];
export let selectedYear = [];
 
setGenre();
setYear();
async function getFilerFilms() {
    const resp = await movieFilter.sortByGenre();
    const response = await resp.json();
    const results = await response;
   
    get(results);
   
}
function get(data) {
      const sortedMovieForRender = createListMarkup(data);
    loaderFilms();
    listEl.insertAdjacentHTML('beforeend', sortedMovieForRender);
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
        renderFilteredList();
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
            renderFilteredList();
        });
    }
}
function renderFilteredList() {
    if (selectedGenre.length > 0 || selectedYear.length > 0) {
                getFilerFilms();
                renderClearBtn();
                mainBtnsEls.style.display = "none";
            } else {
                renderNewPage();
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
        clearList();
        });
};

function clearList() {
    selectedGenre = [];
    selectedYear = [];
    renderNewPage();
    filterListYears.classList.add('is-hidden');
    filterListGeners.classList.add('is-hidden');
    setYear();
    setGenre();
    clear.remove();
 }
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

