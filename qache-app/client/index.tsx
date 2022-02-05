import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import './styles/index.scss';

// import { store } from './Redux/store';
// import { Provider } from 'react-redux';

ReactDOM.render(
  // <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  // </Provider>,
  document.getElementById('app')
);
