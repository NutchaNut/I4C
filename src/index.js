import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';
import Home from './Home'
const config = {
    apiKey: "AIzaSyAkCp9gAP6dOHj_e36yf-6a4hBu0G_ulmk",
    databaseURL: "https://i4cblockchain.firebaseio.com",
  };

firebase.initializeApp(config);


ReactDOM.render(<Home/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
