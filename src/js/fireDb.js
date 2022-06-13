export class MovieDataBase {
  static create(database) {
    fetch(
      'https://filmoteka-group5-default-rtdb.europe-west1.firebasedatabase.app/movieDb.json',
      {
        method: 'post',
        body: JSON.stringify(database),
        headers: {
          'Content-type': 'application.json',
        },
      }
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        database.id = response.name;
        return database;
      })
      .then(addToLocalStorage)
      .then(MovieDataBase.renderList);
  }
  static renderList() {
    const moviesFromLS = getFromLocalStorage();
    const html = moviesFromLS.length
      ? moviesFromLS.map(toCard).join('')
      : `<div>Здесь пока ничего нет</div>`;
    const list = document.querySelector('.main__movie-card-list');
    list.innerHTML = html;
  }
}

function addToLocalStorage(database) {
  const all = getFromLocalStorage();
  all.push(database);
  localStorage.setItem('something', JSON.stringify(all));
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('something') || '[]');
}

function toCard(database) {
  return `<div>Ты не смог пока ничего достать</div>`;
}
