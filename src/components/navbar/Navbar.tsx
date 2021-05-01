import React from "react";
import Account from "../account/Account";
import Cart from "../cart/Cart";
import { Hamburger } from "./hamburger/Hamburger";

const Navbar = () => {
  return (
    <div className="navbar">
      <Hamburger />
      <div className="flex">
        <Account />
        <Cart />
      </div>
    </div>
  );
};

export default Navbar;
