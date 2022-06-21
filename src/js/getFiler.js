import MovieFilter from './fetchFilter';
import { renderNewPage } from './getTrendFilms';
import { createListMarkup } from './renderFilms';
import { getGenres } from './getGenres';

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

const genres = getGenres();
export let selectedGenre = [];
export let selectedYear = [];
 
setGenre();
setYear();
async function getFilerFilms() {
    const response = await movieFilter.sortByGenre();
    const responseJson = await response.json();
    const results = await responseJson;
   
   getRenderMoviesList(results);
   
}
function getRenderMoviesList(data) {
      const createListFiltedMovie = createListMarkup(data);
    loaderFilms();
    listEl.insertAdjacentHTML('beforeend', createListFiltedMovie);
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
  genres.forEach(item => {
    let genre = document.createElement('li');
    genre.classList.add('filter--item__genre');
    genre.id = item.id;
    genre.innerText = item.name;
    genre.addEventListener('click', () => {
      listEl.innerHTML = '';
      movieFilter.resetPage();
      if (selectedGenre.length === 0) {
          selectedGenre.push(item.id);
          genre.classList.add('filter-item__color');
      } else if (selectedGenre.includes(item.id)) {
        selectedGenre.forEach((id, idx) => {
          if (id == item.id) {
              selectedGenre.splice(idx, 1);
              genre.classList.remove('filter-item__color');
          }
        });
      } else {
          selectedGenre.push(item.id);
          genre.classList.add('filter-item__color');
      }
        renderFilteredList();
    });
      genresEl.append(genre);
  });
}


function setYear() {
    yearsEl.innerHTML = '';
    let startYear = 1880;
    let endYear = new Date().getFullYear();
    for (let i = endYear; i > startYear; i--) {
        let year = document.createElement('li');
        year.classList.add('filter--item__year');
        year.value = `${i}`;
        year.textContent = `${i}`;
        yearsEl.append(year);
        year.addEventListener('click', () => {
            listEl.innerHTML = '';
            movieFilter.resetPage();
            if (selectedYear.length == 0) {
                selectedYear.push(i);
                year.classList.add('filter-item__color');
            } else if (selectedYear.includes(i)) {
                selectedYear.forEach((i, idx) => {
                    if (i == i) {
                        selectedYear.splice(idx, 1);
                        year.classList.remove('filter-item__color');
                    }
                });
            } else {
                selectedYear.push(i);
                year.classList.add('filter-item__color');
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
export function renderClearBtn() {
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
    mainBtnsEls.style.display = "flex";
 }


filterYears.addEventListener('click', () => {
  filterListYears.classList.toggle('is-hidden');
  filterListGeners.classList.add('is-hidden');
});

filterGenres.addEventListener('click', () => {
  filterListGeners.classList.toggle('is-hidden');
  filterListYears.classList.add('is-hidden');
});
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
    getFilerFilms();
  }
};
 const observer = new IntersectionObserver(
  callback,
  options.intersectionObserver
);