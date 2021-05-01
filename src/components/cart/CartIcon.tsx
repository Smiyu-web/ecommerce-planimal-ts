import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as ShoppingCart } from "../../assets/img/shopping-cart-solid.svg";
import styled from "styled-components";

import { setHidden } from "../../features/cartSlice";

const CartIcon = () => {
  const dispatch = useDispatch();

  // const handleOpen = () => {
  //   dispatch(setHidden());
  // };

  console.log("hidden", setHidden);

  return (
    <div>
      <ShoppingCart
        className="cartIcon"
        onClick={() => dispatch(setHidden())}
      />
    </div>
  );
};

export default CartIcon;
