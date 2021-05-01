import { createSelector } from "reselect";

type CartContainer = {
  cartItems: [];
  selectCart: (state: {}) => [];
};

const selectCart = (state: any) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart: { cartItems: [] }) => cart.cartItems
);
