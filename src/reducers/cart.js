import { findIndex } from 'lodash';
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREMENT_PRODUCT,
  DECREMENT_PRODUCT,
  TOGGLE_CART,
  FETCH_PRODUCTS,
} from '../constants/constants';


const INITIAL_STATE = {
  entities: {
    products: [],
  },
  counter: 0,
  total: 0,
  opened: false,
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return Object.assign({}, state, action.payload);
    }


    case ADD_PRODUCT: {
      const { entities, counter, total } = state;
      const product = action.payload;
      const productIndex = findIndex(state.entities.products, (p) => p.id === product.id);

      if (productIndex !== -1) {
        product.cost += entities.products[productIndex].cost;
        product.quantity += entities.products[productIndex].quantity;
        return { ...state,
          entities: {
            products: [
              ...entities.products.slice(0, productIndex),
              product,
              ...entities.products.slice(productIndex + 1)],
          },
          counter: counter + 1,
          total: total + product.price,
        };
      }

      return { ...state,
        entities: {
          products: [...entities.products, product],
        },
        counter: counter + 1,
        total: total + product.price,
      };
    }


    case REMOVE_PRODUCT: {
      const { entities, counter, total } = state;
      const productIndex = findIndex(
        state.entities.products, (p) => p.id === action.payload.id
      );
      return { ...state,
        entities: {
          products: [
            ...entities.products.slice(0, productIndex),
            ...entities.products.slice(productIndex + 1)],
        },
        counter: counter - entities.products[productIndex].quantity,
        total: total - entities.products[productIndex].cost,
      };
    }


    case INCREMENT_PRODUCT: {
      const { entities, counter, total } = state;
      const productIndex = findIndex(
        state.entities.products, (p) => p.id === action.payload.id
      );

      return { ...state,
        entities: {
          products: [
            ...entities.products.slice(0, productIndex),
            {
              ...entities.products[productIndex],
              cost: entities.products[productIndex].cost + entities.products[productIndex].price,
              quantity: entities.products[productIndex].quantity + 1,
            },
            ...entities.products.slice(productIndex + 1)],
        },
        counter: counter + 1,
        total: total + entities.products[productIndex].price,
      };
    }


    case DECREMENT_PRODUCT: {
      const { entities, counter, total } = state;
      const productIndex = findIndex(
        state.entities.products, (p) => p.id === action.payload.id
      );

      return { ...state,
        entities: {
          products: [
            ...entities.products.slice(0, productIndex),
            {
              ...entities.products[productIndex],
              cost: entities.products[productIndex].cost - entities.products[productIndex].price,
              quantity: entities.products[productIndex].quantity - 1,
            },
            ...entities.products.slice(productIndex + 1)],
        },
        counter: counter - 1,
        total: total - entities.products[productIndex].price,
      };
    }


    case TOGGLE_CART: {
      return { ...state, opened: !state.opened };
    }


    default:
      return state;
  }
}
