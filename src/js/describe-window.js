import throttle from 'lodash.throttle';


const refs = {
notification: document.querySelector(`.js-alert`)
}

refs.notification.addEventListener('click', onNotificationClick);
showNotification();

function onNotificationClick() {
  hideNotification();
}

function showNotification() {
  refs.notification.classList.add('is-visible');
}

function hideNotification() {
refs.notification.classList.remove('is-visible')
}

const modal = document.querySelector('.describe-modal');
const PROMPT_DELAY = 3000;
  setTimeout(() => {
  modal.show();
 }, PROMPT_DELAY);
// // початок
// // import BSN from 'bootstrap.native';

// const modal = new Modal('#exampleModal');
// console.log(modal);

// const PROMPT_DELAY = 3000;

// setTimeout(() => {
//   modal.show();
// }, PROMPT_DELAY);
// // end

// const KEY = 'feedback-form-state';
const KEY = 'describe-form';
const inputData = {};

const form = document.querySelector('.describe-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  const savedData = localStorage.getItem(KEY);
  if (savedData) {
    const { username, email } = JSON.parse(savedData);
    form.username.value = username;
    form.email.value = email;
    inputData.username = username;
    inputData.email = email;
    
  }
}

function onFormInput(event) {
  inputData.username = form.elements.username.value;
  inputData.email = form.elements.email.value;
  
  localStorage.setItem(KEY, JSON.stringify(inputData));
}

function onFormSubmit(event) {
  event.preventDefault();

  const formDataToSend = new FormData(event.currentTarget);
  formDataToSend.forEach((value, name) => {
    inputData[name] = value;
  });

  event.currentTarget.reset();
  localStorage.removeItem(KEY);

  console.log(inputData);
}
