import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { CartProvider } from './context/cart.context';
import { UserProvider } from './context/user.context';
import { CategoriesProvider } from './context/categories.context';
import App from './App';

import './index.scss';

const rootElement = document.getElementById('root');

// render(what,  where)
render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
