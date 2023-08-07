import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/index';
import './main.scss';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App name="Lucky Coders!!!" />
    </React.StrictMode>,
  );
}
