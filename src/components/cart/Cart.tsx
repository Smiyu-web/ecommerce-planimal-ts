import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectSetHidden } from "../../features/cartSlice";
import CartIcon from "./CartIcon";
import CartDropDown from "./CartDropDown";

const Cart = () => {
  const hiddenProps = useSelector(selectSetHidden);
  console.log(selectSetHidden);

  return (
    <div>
      <CartIcon />
      {hiddenProps ? null : <CartDropDown />}
    </div>
  );
};

export default Cart;
