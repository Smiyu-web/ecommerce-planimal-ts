export const TOGGLE_CART_HIDDEN = "TOGGLE_CART_HIDDEN";

export const toggleCartHidden = () => {
  type: TOGGLE_CART_HIDDEN;
  hidden: Boolean;
};
