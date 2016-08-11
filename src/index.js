import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import ee from 'event-emitter';
import Cart from './containers/Cart/Cart.jsx';

const storeWithMiddleware = store();
const emitter = ee({});
const links = document.querySelectorAll('.product__addCart');


render(
  <Provider store={storeWithMiddleware}>
    <Cart ee={emitter} />
  </Provider>
  , document.getElementById('shoppingCart')
);


links.forEach(el => {
  el.addEventListener('click', function cb(e) {
    e.preventDefault();
    const productId = this.getAttribute('data-id');
    emitter.emit('addCart', productId);
  });
});
