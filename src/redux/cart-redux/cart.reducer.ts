import { TOGGLE_CART_HIDDEN } from "./cart.action";

interface INITIAL_STATE {
  cartItems: [];
  hidden: boolean;
}

interface CartAction extends INITIAL_STATE {
  type: string;
}

// const INITIAL_STATE = {
//   hidden: false,
// };

export const cartReducer = (state: INITIAL_STATE): CartAction => {
  return {
    type: "TOGGLE_CART_HIDDEN",
    ...state,
    hidden: !state.hidden,
  };
};
