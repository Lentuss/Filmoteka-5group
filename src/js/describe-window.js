import throttle from 'lodash.throttle';

// початок
// import BSN from 'bootstrap.native';

// const modal = new BSN.Modal('#exampleModal');
// console.log(modal);

// const PROMPT_DELAY = 3000;

// setTimeout(() => {
//   modal.show();
// }, PROMPT_DELAY);
// end

const KEY = 'feedback-form-state';
const inputData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

updateForm();

function updateForm() {
  const savedData = localStorage.getItem(KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    form.email.value = email;
    form.message.value = message;
    inputData.email = email;
    inputData.message = message;
  }
}

function onFormInput(event) {
  inputData.email = form.elements.email.value;
  inputData.message = form.elements.message.value;
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
