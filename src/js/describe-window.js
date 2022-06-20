import throttle from 'lodash.throttle';

const refs = {
  describeModal: document.querySelector('.describe-modal'),
  describeCloseBtn: document.querySelector('.describe-modal__close'),
};

setTimeout(() => {
  refs.describeModal.classList.remove('isHidden');
}, 5000);

function closeModal() {
  refs.describeModal.classList.add('isHidden');
}

function closeByEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

refs.describeCloseBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', closeByEscape);

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
