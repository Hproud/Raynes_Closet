import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import sessionReducer from './session';
import productReducer from './products';
import cartReducer from './cart';
import orderReducer from './order';
import inventoryReducer from './inventory';
import suggestionReducer from './suggestion';
import masterReducer from './masterFunc';
import cartItemsReducer from './cartItems';

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  inventory: inventoryReducer,
  suggestions: suggestionReducer,
  admins: masterReducer,
  cartItems: cartItemsReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };


  export default configureStore;
