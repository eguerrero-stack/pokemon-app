import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Battle from './Battle';
import {BrowserRouter as Router, Route } from "react-router-dom"; 

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" render={() => <App />} />
      <Route path="/battle" render={() => <Battle />}  />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


