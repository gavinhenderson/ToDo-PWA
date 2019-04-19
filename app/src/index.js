import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  const registration = navigator.serviceWorker
    .register('sw.js')
    .then((reg) => {
      console.log('created SW', reg);
    })
    .catch((err) => {
      console.log('There was an error creating the SW', err);
    });
}
