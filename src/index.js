import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
let render = () => {
  // Dynamically import our main MainApp component, and render it
  const MainApp = require('./MainApp').default;
  ReactDOM.render(
    <MainApp/>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const MainApp = require('./MainApp').default;
    render(
      <MainApp/>,
      rootEl
    );
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

render();