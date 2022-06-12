// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { doc, getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAXr3vyab8PJtuI-kO5zXVUNDPWQzN3ayY',
  authDomain: 'filmoteka-group5.firebaseapp.com',
  databaseURL:
    'https://filmoteka-group5-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-group5',
  storageBucket: 'filmoteka-group5.appspot.com',
  messagingSenderId: '217077508176',
  appId: '1:217077508176:web:dbb78c93f591370ec90955',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const Refs = {
  logInSubmitBtn: document.querySelector('[data-action="logIn-submit-btn"]'),
  signInSubmitBtn: document.querySelector('[data-action="signIn-submit-btn"]'),
  singInBtn: document.querySelector('.signInBtn-JS'),
  logInBtn: document.querySelector('.logInBtn-JS'),
  modalWindow: document.querySelector('.modal'),
  headerLogInButton: document.querySelector(
    '[data-action="header-library-button"]'
  ),
  formContainer: document.querySelector('.form-container'),

  backdrop: document.querySelector('[data-backdrop]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
};

const formData = {};
const STORAGE_KEY = 'form_submit';

Refs.singInBtn.addEventListener('click', signInWindow);
Refs.logInBtn.addEventListener('click', logInWindow);

Refs.headerLogInButton.addEventListener('click', onOpenModal);
Refs.closeModalBtn.addEventListener('click', onCloseModal);
Refs.backdrop.addEventListener('click', onBackdropClick);

const signupForm = document.querySelector('#form');
signupForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const email = signupForm['input-email'].value;
  const password = signupForm['input-password'].value;
  console.log(email, password);

  formData[e.target.email.name] = e.target.email.value;
  formData[e.target.password.name] = e.target.password.value;

  const savedString = JSON.stringify(formData);
  console.log(savedString);
  localStorage.setItem(STORAGE_KEY, savedString);
  // console.log(formData);
  // console.dir(e.target);

  createUserWithEmailAndPassword(getAuth(app), email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(userCredential);
      console.log(user);
      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  onCloseModal();

  //   console.log(e.target.email.value);
  //   console.log(e.target.password.value);
  //   console.dir(FormRefs.emailInput.value);
}

function closeModalByEsc(event) {
  //   console.log('key: ', event.key);
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onOpenModal() {
  Refs.backdrop.classList.toggle('backdrop--is-hidden');
  window.addEventListener('keydown', closeModalByEsc);
}

function onCloseModal() {
  Refs.backdrop.classList.toggle('backdrop--is-hidden');
  window.removeEventListener('keydown', closeModalByEsc);
}

function logInWindow() {
  console.log('мы нажали кнопку logIn');
  Refs.singInBtn.classList.remove('--is-hidden');
  Refs.logInBtn.classList.add('--is-hidden');
  Refs.logInSubmitBtn.classList.remove('--is-hidden');
  Refs.signInSubmitBtn.classList.add('--is-hidden');
  Refs.formContainer.innerHTML = `
        <label>
          Email
          <input type="email" name="email" id="input-email" />
        </label>

        <label>
          Password
          <input type="password" name="password" id="input-password" />
        </label>
 `;
}
function signInWindow(e) {
  console.log('мы нажали кнопку signIn');
  Refs.singInBtn.classList.add('--is-hidden');
  Refs.logInBtn.classList.remove('--is-hidden');
  Refs.logInSubmitBtn.classList.add('--is-hidden');
  Refs.signInSubmitBtn.classList.remove('--is-hidden');
  Refs.formContainer.innerHTML = `
      <label>
          Email
          <input type="email" name="email" id="input-email" />
        </label>

        <label>
          Password
          <input type="password" name="password" id="input-password" />
        </label>

      <label>
        Confirm password
        <input type="password" name="password-confirmation id="passwordConfirm" />
      </label>

     
    
`;
}
