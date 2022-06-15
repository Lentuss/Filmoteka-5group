import { IMAGE_URL, API_KEY, GENRES_URL } from './apiVariables';
// import { getGenreById } from './getGenres';
import GetFilmsApiService from './getTrendFilmsApiService';

const listEl = document.querySelector('.main__movie-card-list');
const btnDayEl = document.querySelector('.trends-of-day');
const btnWeekEl = document.querySelector('.trends-of-week');

const getFilmsApiService = new GetFilmsApiService();

btnDayEl.addEventListener('click', onBtnDayClick);
btnWeekEl.addEventListener('click', onBtnWeekClick);

renderNewPage();

function renderNewPage() {
  listEl.innerHTML = '';
  getFilmsApiService.resetPage();
  getTrendFilms();
}

function onBtnDayClick() {
  getFilmsApiService.trendsOfDay();
  renderNewPage();
}

function onBtnWeekClick() {
  getFilmsApiService.trendsOfWeek();
  renderNewPage();
}

async function getTrendFilms() {
  try {
    const requestedFilms = await getFilmsApiService.getFilms();
    onGetSucces(requestedFilms);
  } catch (error) {
    onGetError();
    console.log(error.message);
  }
}

function onGetSucces(requestedFilms) {
  console.log(requestedFilms);
  listEl.insertAdjacentHTML('beforeend', createListMarkup(requestedFilms));
  observer.observe(listEl.lastElementChild);
}

function onGetError(error) {
  console.log(error);
}

function createListMarkup(requestedFilms) {
  return requestedFilms.results
    .map(
      ({
        poster_path,
        original_title,
        original_name,
        genre_ids,
        release_date,
        first_air_date,
      }) => {
        let date = '';
        let name = '';

        let arrGenreToAdd = [];

        const genresToAdd = genre_ids.map(async el => {
          const genresData = await getGenres();
          const genresObj = await genresData.json();
          const genresArr = await genresObj.genres;
          const genres = genresArr.forEach(genre => {
            if (el === genre.id) {
              arrGenreToAdd.push(genre.name);
            }
          });
        });
        console.log(arrGenreToAdd);

        // console.log(genres);

        // console.log(element);
        //   const el = await getGenreById(element);
        //   const name = await el.json();
        //   console.log(name);
        // });
        // console.log(genres);

        if (release_date) {
          date = release_date.substr(0, 4);
        } else {
          date = first_air_date.substr(0, 4);
        }

        if (original_title) {
          name = original_title;
        } else {
          name = original_name;
        }
        const arr = [...arrGenreToAdd];
        return `
        <li class="main__movie-card-item">
            <img class="main__movie-img" src="${IMAGE_URL}${poster_path}" src='./images/movie-1.jpg' alt="${original_title}">
                <div class="main__movie-info">
                    <h2 class="main__movie-title">${name}</h2>
                    <p class="main__movie-genre">${[
                      ...arr,
                    ]}<span class="main_movie-year">${date}</span></p>
                </div>
        </li>
        `;
      }
    )
    .join('');
}

// infinite scroll

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
    getTrendFilms();
  }
};

const observer = new IntersectionObserver(
  callback,
  options.intersectionObserver
);
const getGenres = () => {
  return fetch(`${GENRES_URL}?api_key=${API_KEY}&language=en-US`);
};

function getGenreById(id) {
  getGenres()
    .then(res => res.json())
    .then(res => res.genres)
    .then(res => {
      const el = res.map(element => {
        if (element.id === id) {
          const elName = element.name;
          //   console.log(elName);
          return elName;
        }
      });
      return el;
    })
    .then(res => {
      //   console.log(res);
    });
}
