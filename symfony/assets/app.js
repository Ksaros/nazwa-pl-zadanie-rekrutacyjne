/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './scss/app.scss';

// start the Stimulus application
import './bootstrap';

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';

axios.defaults.baseURL = `/`;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Router>
            <Home />
      </Router>
);
