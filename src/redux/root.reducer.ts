import { combineReducers } from "redux";

import { cartReducer } from "./cart-redux/cart.reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
