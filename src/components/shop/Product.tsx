import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// import { addItem } from "../../redux/cart/cart.action";
import CustomBtn from "../UIkit/CustomBtn";
import PRODUCT_DATA, { Data } from "../../pages/products/products.data";

const Hover = styled.div`
  .hover {
    position: relative;
    width: 200px;
    height: auto;
  }
  .hover-img img {
    width: 100%;
    height: 310px;
  }
  .hover .hover-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: 0.3s ease-in-out;
  }
  .hover .hover-btn {
    position: absolute;
    padding: 250px 30px 0px 30px;
  }
  .hover:hover .hover-btn {
    opacity: 1;
  }
`;

type ProductProps = {
  data: Data[];
};

const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <>
      {data.map((item) => {
        return (
          <div id={`${item.id}`} className="w-52 m-12">
            <Hover className="hover">
              <div className="hover">
                <div className="hover-img">
                  <img src={item.imageUrl} alt="cafe" />
                </div>
                <div className="hover-btn">
                  <CustomBtn
                    button="ADD ITEM"
                    // onClick={() => addItemProps(item)}
                  />
                </div>
              </div>
            </Hover>

            <div className="flex justify-between mx-2 mt-2">
              <h3>{item.name}</h3>
              <h3>${item.price}</h3>
            </div>
            <h6 className="text-primary ml-1">{item.brand}</h6>
          </div>
        );
      })}
    </>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   addItemProps: (item) => dispatch(addItem(item)),
// });

export default Product;
