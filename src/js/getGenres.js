import { API_KEY, GENRES_URL } from './apiVariables';

export const getGenres = () => {
  return fetch(`${GENRES_URL}?api_key=${API_KEY}&language=en-US`);
};

export function getGenreById(id) {
  getGenres()
    .then(res => res.json())
    .then(res => res.genres)
    .then(res => {
      res.map(element => {
        if (element.id === id) {
          return element.name;
        }
        console.log(element.name);
      });
      // console.log(res);
    });
}

//тест
