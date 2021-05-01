import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: [];
  hidden: Boolean;
}

const initialState: CartState = {
  cartItems: [],
  hidden: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setHidden: (state) => {
      state.hidden = !state.hidden;
    },
  },
});

export const { setHidden } = cartSlice.actions;

export const selectSetHidden = (state: { cartStore: CartState }) =>
  state.cartStore;
// export const selectSetHidden = (state: CartState) => state.cart.hidden;
