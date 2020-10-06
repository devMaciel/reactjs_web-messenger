import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaTlO8Cd1tE8DqDklP0OQg9a7P6oiulP8",
  authDomain: "reactjs-web-messenger.firebaseapp.com",
  databaseURL: "https://reactjs-web-messenger.firebaseio.com",
  projectId: "reactjs-web-messenger",
  storageBucket: "reactjs-web-messenger.appspot.com",
  messagingSenderId: "59745116137",
  appId: "1:59745116137:web:04d879659cbbfa8485b578"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
