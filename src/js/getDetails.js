import { API_KEY, DETAILS_URL } from './apiVariables';
import axios from 'axios';

const moviesList = document.querySelector('.main__movie-card-list');
const detailsModal = document.querySelector('.details');

const clickForDetails = e => {
  e.preventDefault();
  detailsModal.classList.remove('isHidden');

  if (e.target.nodeName === 'UL') {
    console.log('Ooooops!');
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
    .then(({ data }) => data)
    .then(detailsInfo);
  return details;
}

// console.log(detailsInfo());
