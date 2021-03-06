import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux';

import App from './App';
import Reducers from './Reducers';

const store = createStore(Reducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
