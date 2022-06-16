
const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');
const genres = document.querySelector('main__movie-genre');
const movieDesc = document.querySelector('main__movie-card-item');
const backdrop = document.querySelector('details__backdrop');
const section = document.querySelector('section');


checkbox.addEventListener("change", onSwitchClick);


function onSwitchClick(){
    if (checkbox.checked) 
    {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        genres.classList.add('dark-theme');
        genres.classList.remove('light-theme');

        section.classList.add('dark-theme');
        section.classList.remove('light-theme');

        movieDesc.classList.add('dark-theme');
        movieDesc.classList.remove('light-theme');
        
        backdrop.classList.add('dark-theme');
        backdrop.classList.remove('light-theme');
        
        } 
        
        else {
          body.classList.add('light-theme',);
          body.classList.remove('dark-theme');
    
          genres.classList.add('light-theme',);
          genres.classList.remove('dark-theme');
        
          section.classList.add('light-theme',);
          section.classList.remove('dark-theme');

          movieDesc.classList.add('light-theme',);
          movieDesc.classList.remove('dark-theme');
          
          backdrop.classList.add('light-theme',);
          backdrop.classList.remove('dark-theme');
    
      }
    }; 

   