import { API_KEY, DETAILS_URL, IMAGE_URL, BACKDROP_URL } from './apiVariables';
import axios from 'axios';

const moviesList = document.querySelector('.main__movie-card-list');
const detailsModal = document.querySelector('.details');
const backdropDetails = document.querySelector('.details__backdrop');
const box = document.querySelector('.details__box');
const detCloseBtn = document.querySelector('.details__close-button');

/// если нет деталей
// если нет постера
//если нет бекдропа
//если нет ничего
//очистка
//on slider
///проверки
//стили жанров мобилки/таблетки

const clickForDetails = e => {
  e.preventDefault();
  clearInfo();

  detailsModal.classList.remove('isHidden');

  if (e.target.nodeName === 'UL') {
    return;
  }
  const movieId = e.target.closest('LI').dataset.movieid;
  console.log(movieId);
  getDetails(movieId);
};

export const detailsInfo = data => {
  console.log(data);
  return data;
};

moviesList.addEventListener('click', clickForDetails);

export async function getDetails(movieId) {
  const details = await axios
    .get(`${DETAILS_URL + movieId}?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data);

  const {
    backdrop_path,
    genres,
    original_title,
    overview,
    poster_path,
    popularity,
    title,
    vote_average,
    vote_count,
    id,
  } = details;

  const genreArr = genres.map(genre => genre.name);

  backdropDetails.style.backgroundImage = `url(${
    BACKDROP_URL + backdrop_path
  })`;
  //дописать логику отсутствия

  const infoBox = document.querySelector('.details__info');

  const markupImg = `<div class="details__poster">
                    <img class="details__image"
                        src="${IMAGE_URL + poster_path}" alt="${title}poster"
                        width="375px" />
                </div>`;

  const markup = `
                    <h2 class="details__title">${title}</h2>
                    <ul class="details__attributesList">
                        <li>
                            <span class="details__attribute"> Vote/Votes
                            </span>
                            <span class="details__attribute-value">
                                <span class="details__attribute-vote">${vote_count}</span> / ${vote_average}</span>
                        </li>
                        <li>
                            <span class="details__attribute">Popularity
                            </span>
                            <span class="details__attribute-value">
                                ${popularity}
                            </span>
                        </li>
                        <li>
                            <span class="details__attribute">Original Title
                            </span>
                            <span class="details__attribute-value details__attribute-title">
                                ${original_title}
                            </span>
                        </li>
                        <li>
                            <span class="details__attribute">Genre
                            </span>
                            <span class="details__attribute-value">${genreArr}</span>
                        </li>
                    </ul>
                    <p class="details__subtitle">about</p>
                    <p class="details__description">${overview}
                    </p>`;

  box.insertAdjacentHTML('afterbegin', markupImg);
  infoBox.insertAdjacentHTML('afterbegin', markup);
}

//+++++close-modal++++++

const clearInfo = () => {
  box.innerHTML = ` <div class="details__info">
                    <div class="details__buttonSet">
                        <button class="details__button details__button-accent" type="button"
                            data-action="details-watched-btn">add to
                            watched</button>
                        <button class="details__button" type="button" data-action="details-queue-btn">add to
                            queue</button>
                    </div>
                </div>`;
};

const onClose = e => {
  detailsModal.classList.add('isHidden');
};

const closeByEsc = e => {
  //   e.preventDefault();
  if (e.code === 'Escape') {
    detailsModal.classList.add('isHidden');
  }
};

const onBackdropClose = e => {
  //   e.preventDefault();
  if (e.target === e.currentTarget) {
    onClose();
  }
};

window.addEventListener('keydown', closeByEsc);
detCloseBtn.addEventListener('click', onClose);
backdropDetails.addEventListener('click', onBackdropClose);

// detailsModal.setAttribute('id', `${id}`);
// console.log(detailsInfo());

//second version

// import { API_KEY, DETAILS_URL } from './apiVariables';
// import axios from 'axios';

// const moviesList = document.querySelector('.main__movie-card-list');
// const detailsModal = document.querySelector('.details');

// export class GetDetailsInfo {
//   constructor(movieId) {
//     this.movieId = movieId;
//   }

//   static async getDetails(movieId) {
//     const details = await axios
//       .get(`${DETAILS_URL + movieId}?api_key=${API_KEY}&language=en-US`)
//       .then(({ data }) => data)
//       .then(detailsInfo);

//     return details;
//   }

//   get movieId() {
//     return this.movieId;
//   }

//   // Сеттер email
//   set movieId(newMovieId) {
//     this.movieId = newMovieId;
//   }

//   static clickForDetails(e) {
//     e.preventDefault();
//     detailsModal.classList.remove('isHidden');

//     if (e.target.nodeName === 'UL') {
//       console.log('Ooooops!');
//       return;
//     }
//     const nMovieId = e.target.closest('LI').dataset.movieid;

//     GetDetailsInfo.getDetails(nMovieId);
//     console.log(this.movieId);
//   }
// }

// export const detailsInfo = data => {
//   console.log(data);
//   return data;
// };

// moviesList.addEventListener('click', GetDetailsInfo.clickForDetails);

// console.log(detailsInfo())
