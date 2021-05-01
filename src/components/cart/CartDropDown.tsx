import React from "react";
import styled from "styled-components";
import CustomBtn from "../UIkit/CustomBtn";
// import CartItem from "./CartItem";

const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;
`;

const EmptyMessageContainer = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

const CartItemsContainer = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
const CartDropDown = () => {
  return (
    <div>
      <CartDropdownContainer>
        <CartItemsContainer>
          {/* {cartItems.length ? (
            cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} item={cartItem} />
            ))
          ) : (
            <EmptyMessageContainer>Empty</EmptyMessageContainer>
          )} */}
        </CartItemsContainer>
        <div className="mx-auto">
          <CustomBtn button="CHECH OUT" />
        </div>
      </CartDropdownContainer>
    </div>
  );
};

export default CartDropDown;
