


const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');
const section = document.querySelector("#section-switch");
const footer = document.querySelector("#footer-switch");

const buttonDay = document.querySelector("#button-color-day");
const buttonWeek = document.querySelector("#button-color-week");

const movieTitle = document.querySelector("#title-color");


checkbox.addEventListener("change", onSwitchClick);


function onSwitchClick(){
  if (checkbox.checked) 
  {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      

      section.classList.add('dark-on');
      section.classList.remove('light-on');

      buttonDay.classList.add('button-dark');
      buttonDay.classList.remove('button-ligh');

      buttonWeek.classList.add('button-dark');
      buttonWeek.classList.remove('button-ligh');

      footer.classList.add('footer-dark');
      footer.classList.remove('footer-light');

      // movieTitle.classList.add('title-dark');
      // movieTitle.classList.remove('title-light');
  
      } 
      
      else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');

        section.classList.add('light-on');
        section.classList.remove('dark-on');

        buttonDay.classList.add('button-ligh');
        buttonDay.classList.remove('button-dark');

        buttonWeek.classList.add('button-ligh');
        buttonWeek.classList.remove('button-dark');

      footer.classList.add('footer-light');
      footer.classList.remove('footer-dark');

      // movieTitle.classList.add("title-light");
      // movieTitle.classList.remove('title-dark');


  
    }
  }; 

    
