import React from "react";
import Product from "./Product";
import PRODUCT_DATA from "../../pages/products/products.data";

const ShopProductsContainer = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Product data={PRODUCT_DATA} />
    </div>
  );
};

export default ShopProductsContainer;
