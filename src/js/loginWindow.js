import { MovieDataBase } from './fireDb';
import libraryRender from './renderLibrary';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  timeout: 1000,
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
  clickToClose: true,
});

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  once,
  remove,
} from 'firebase/database';

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const Refs = {
  headLogInBtn: document.querySelector('[data-action="header-login-button"]'),
  headLibraryBtn: document.querySelector(
    '[data-action="header-library-button"]'
  ),
  backdrop: document.querySelector('[data-backdrop]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  signUpBtnWindow: document.querySelector('.signUpBtn-JS'),
  logInBtnWindow: document.querySelector('.logInBtn-JS'),
  logOutBtn: document.querySelector('.logOutBtn-JS'),
  signUpDiv: document.querySelector('#signUpDiv'),
  logInDiv: document.querySelector('#logInDiv'),
};

//============================= AUTH STATUS ========================
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    Refs.signUpBtnWindow.classList.add('--is-hidden');
    Refs.logInBtnWindow.classList.add('--is-hidden');
    Refs.logInDiv.setAttribute('style', 'display:none');
    Refs.signUpDiv.setAttribute('style', 'display:none');
    Refs.logOutBtn.classList.remove('--is-hidden');
    Refs.headLogInBtn.textContent = 'User Profile';
    Refs.headLibraryBtn.classList.remove('--is-hidden');

    const uid = user.uid;
    console.log(`User ${uid} Is Logged In`);

    const allInfo = ref(db, 'users/' + uid);
    onValue(allInfo, snapshot => {
      const data = snapshot.val();
      console.log(data);
      // console.log(data.queue);
      // updateStarCount(postElement, data);
    });
  } else {
    // User is signed out
    Refs.signUpBtnWindow.classList.remove('--is-hidden');
    Refs.logInBtnWindow.classList.remove('--is-hidden');
    Refs.logOutBtn.classList.add('--is-hidden');
    Refs.logInDiv.setAttribute('style', 'display:flex');
    Refs.signUpDiv.setAttribute('style', 'display:flex');
    Refs.headLogInBtn.textContent = 'Log In';
    Refs.headLibraryBtn.classList.add('--is-hidden');

    console.log('User Is Signed Out');
  }
});

//=================== SIGNUP LOGIC START ==================
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', onSignUpSubmit);

function onSignUpSubmit(e) {
  e.preventDefault();
  //   console.log('Жмакнули Submit');
  const email = signupForm['signup-input-email'].value;
  const password = signupForm['signup-input-password'].value;
  const passwordConfirm = signupForm['passwordConfirm'].value;
  if (!email || !password || !passwordConfirm) {
    Notiflix.Notify.warning('Fields cannot be empty ');
  } else if (password !== passwordConfirm) {
    Notiflix.Notify.warning('Password fields is  not the same');
  } else {
    // console.log(email, password);
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        console.log(user.uid);
        Notiflix.Notify.success('You Successfully SignUp');
        const userId = user.uid;
        // writeUserData(userId, email, password);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });

    onCloseModal();
    signupForm.reset();
  }
}

//=================== SIGNUP LOGIC END ==================

//=================== LOGIN LOGIC START ==================
const formData = {};
const STORAGE_KEY = 'form_submit';

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', onLogInSubmit);

function onLogInSubmit(e) {
  e.preventDefault();
  const email = loginForm['input-email'].value;
  const password = loginForm['input-password'].value;

  signInWithEmailAndPassword(getAuth(), email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log(user);

      formData[e.target.email.name] = e.target.email.value;
      formData[e.target.password.name] = e.target.password.value;
      const savedString = JSON.stringify(formData);
      //   console.log(savedString);
      //   localStorage.setItem(STORAGE_KEY, savedString);

      const userDataBase = {
        date: new Date().toJSON(),
        movieID: savedString,
        user: user,
      };
      console.log(userDataBase);

      Notiflix.Notify.success('Enter Success');
      onCloseModal();
      setTimeout(() => {
        loginForm.reset();
      }, 1500);

      // ...
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      Notiflix.Notify.failure('Login Failed wrong email or password');
    });
}
//=================== LOGIN LOGIC END ==================

Refs.headLogInBtn.addEventListener('click', onOpenModal);
Refs.closeModalBtn.addEventListener('click', onCloseModal);
Refs.backdrop.addEventListener('click', onBackdropClick);
Refs.signUpBtnWindow.addEventListener('click', onShowSignUpWindow);
Refs.logInBtnWindow.addEventListener('click', onShowLogInWindow);
Refs.logOutBtn.addEventListener('click', onLogOutBtn);

//=================== LOG OUT LOGIC START ==================
function onLogOutBtn(e) {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      signupForm.reset();
      loginForm.reset();
      setTimeout(() => {
        Notiflix.Notify.success('Logout Success');
        console.log('Logout Success');
      }, 1500);
    })
    .catch(error => {
      // An error happened.
      console.log(error);
      console.log('Logout Failed');
    });
}
//=================== LOG OUT LOGIC END ==================

function onShowSignUpWindow() {
  Refs.signUpDiv.classList.remove('--is-hidden');
  Refs.logInDiv.classList.add('--is-hidden');
}

function onShowLogInWindow() {
  Refs.signUpDiv.classList.add('--is-hidden');
  Refs.logInDiv.classList.remove('--is-hidden');
}

function onOpenModal() {
  Refs.backdrop.classList.toggle('backdrop--is-hidden');
  window.addEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(event) {
  const ESC_KEY_CODE = 'Escape';
  if (event.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

function onCloseModal() {
  Refs.backdrop.classList.toggle('backdrop--is-hidden');
  window.removeEventListener('keydown', closeModalByEsc);
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

export function addMovieInfoToDataBaseWatch(
  movieID,
  title,
  img,
  genres,
  year,
  uid
) {
  const db = getDatabase();

  set(ref(db, 'users/' + uid + '/watched' + `/${movieID}`), {
    movieID,
    title,
    img,
    genres,
    year,
  });
}

export function removeMovieIDFromWatched(uid, movieID) {
  const db = getDatabase();

  remove(ref(db, 'users/' + uid + '/watched' + `/${movieID}`));
}

export function addMovieInfoToDataBaseQueue(
  movieID,
  title,
  img,
  genres,
  year,
  uid
) {
  const db = getDatabase();

  set(ref(db, 'users/' + uid + '/queue' + `/${movieID}`), {
    movieID,
    title,
    img,
    genres,
    year,
  });
}

export function removeMovieIDFromQueue(uid, movieID) {
  const db = getDatabase();

  remove(ref(db, 'users/' + uid + '/queue' + `/${movieID}`));
}
