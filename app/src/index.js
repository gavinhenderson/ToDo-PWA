import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then((reg) => {
      reg.onupdatefound = () => {
        console.log('Installing new service worker');

        reg.installing.onstatechange = function() {
          console.log('State:', this.state);
        };
      };
    })
    .catch((err) => {
      console.log('There was an error creating the SW', err);
    });
}
