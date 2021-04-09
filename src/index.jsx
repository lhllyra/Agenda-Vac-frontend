import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'rc-time-picker/assets/index.css';
import App from './App';

ReactDOM.render(
  <>
    <ToastContainer />
    <App />
  </>,
  document.getElementById('root'),
);
