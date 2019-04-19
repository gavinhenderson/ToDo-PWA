import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  console.log(serviceWorkerOption.scriptURL);
  const registration = runtime
    .register({ scriptURL: '/sw.js' })
    .then((reg) => {
      console.log('created SW', reg);
    })
    .catch((err) => {
      console.log('There was an error creating the SW', err);
    });
}
