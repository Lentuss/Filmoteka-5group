
const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');
const section = document.querySelector("#section-switch");
const footer = document.querySelector("footer");
const button = document.querySelector("#button-color");

checkbox.addEventListener("change", onSwitchClick);


function onSwitchClick(){
  if (checkbox.checked) 
  {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      

      section.classList.add('dark-on');
      section.classList.remove('light-on');

      button.classList.add('dark-on');
      button.classList.remove('light-on');

      footer.classList.add('dark-on');
      footer.classList.remove('light-on');
  
      } 
      
      else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
  
       
      
        section.classList.add('light-on');
        section.classList.remove('dark-on');
        button.classList.add('light-on');
        button.classList.remove('dark-on');



       footer.classList.add('light-on');
        footer.classList.remove('dark-on');

    
  
    }
  }; 

    
