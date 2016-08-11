import { findIndex } from 'lodash';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  TOGGLE_CART,
  FETCH_PRODUCTS,
} from '../constants/constants';
import { FAKE_DATA } from '../constants/fakeData';


export function fetchProducts() {
  if (!localStorage.cart) {
    const cart = {
      entities: {
        products: [],
      },
      counter: 0,
      total: 0,
    };
    localStorage.setItem('cart', JSON.stringify(cart));
    return {
      type: FETCH_PRODUCTS,
      payload: {},
    };
  }
  const cart = JSON.parse(localStorage.cart);
  return {
    type: FETCH_PRODUCTS,
    payload: cart,
  };
}


export function addProduct(id) {
  return (dispatch) => {
    const cart = JSON.parse(localStorage.cart);
    const productIndex = findIndex(cart.entities.products, (p) => p.id === id);
    if (productIndex !== -1) {
      const product = cart.entities.products[productIndex];
      product.cost += product.price;
      product.quantity += 1;
      cart.counter += 1;
      cart.total += product.price;
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: ADD_PRODUCT,
        payload: product,
      });
    } else {
      setTimeout(() => {
        const fdProductIndex = findIndex(FAKE_DATA, (p) => p.id === id);
        const newProduct = FAKE_DATA[fdProductIndex];
        cart.entities.products.push(newProduct);
        cart.counter += 1;
        cart.total += newProduct.price;
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
          type: ADD_PRODUCT,
          payload: newProduct,
        });
      }, 200);
    }
  };
}


export function removeProduct(id) {
  const cart = JSON.parse(localStorage.cart);
  const productIndex = findIndex(cart.entities.products, (p) => p.id === id);
  cart.counter -= cart.entities.products[productIndex].quantity;
  cart.total -= cart.entities.products[productIndex].cost;
  cart.entities.products = [
    ...cart.entities.products.slice(0, productIndex),
    ...cart.entities.products.slice(productIndex + 1)];
  localStorage.setItem('cart', JSON.stringify(cart));

  return {
    type: REMOVE_PRODUCT,
    payload: { id },
  };
}

export function incrementProduct(id) {
  const cart = JSON.parse(localStorage.cart);
  const productIndex = findIndex(cart.entities.products, (p) => p.id === id);
  cart.entities.products[productIndex].cost += cart.entities.products[productIndex].price;
  cart.entities.products[productIndex].quantity += 1;
  cart.counter += 1;
  cart.total += cart.entities.products[productIndex].price;
  localStorage.setItem('cart', JSON.stringify(cart));

  return {
    type: INCREMENT_PRODUCT,
    payload: { id },
  };
}

export function decrementProduct(id) {
  const cart = JSON.parse(localStorage.cart);
  const productIndex = findIndex(cart.entities.products, (p) => p.id === id);
  cart.entities.products[productIndex].cost -= cart.entities.products[productIndex].price;
  cart.entities.products[productIndex].quantity -= 1;
  cart.counter -= 1;
  cart.total -= cart.entities.products[productIndex].price;
  localStorage.setItem('cart', JSON.stringify(cart));

  return {
    type: DECREMENT_PRODUCT,
    payload: { id },
  };
}

export function toggleCart() {
  return {
    type: TOGGLE_CART,
    payload: {},
  };
}
