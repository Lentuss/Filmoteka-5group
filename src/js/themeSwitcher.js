
const body = document.querySelector('body');
const checkbox = document.querySelector('input[type="checkbox"]');

checkbox.addEventListener("change", onSwitchClick);


function onSwitchClick(){
    if (checkbox.checked) 
    {body.classList.add('light-theme',);
    body.classList.remove('dark-theme');
        } else {
            // body.classList.remove("light-theme");
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
      }
    }; 


