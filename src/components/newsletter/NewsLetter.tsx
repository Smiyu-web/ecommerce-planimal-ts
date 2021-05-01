import React from "react";
import styled from "styled-components";
import CustomBtn from "../UIkit/CustomBtn";

const Input = styled.div`
  .cp_iptxt {
    position: relative;
    width: 30%;
    margin: 40px 3%;
  }
  .cp_iptxt input[type="email"] {
    font-size: 13px;
    box-sizing: border-box;
    width: 100%;
    letter-spacing: 1px;
    padding-left: 4em;
  }
  .cp_iptxt input[type="email"]:focus {
    outline: none;
  }
  .ef {
    padding: 4px 0;
    border: 0;
    border-bottom: 1px solid #1b2538;
    background-color: transparent;
  }
  .ef ~ .focus_line {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    transition: 0.4s;
    background-color: #646464;
  }
  .ef:focus ~ .focus_line,
  .cp_iptxt.ef ~ .focus_line {
    width: 100%;
    transition: 0.4s;
  }
  .ef ~ label {
    position: absolute;
    z-index: -1;
    top: 4px;
    left: 0;
    width: 100%;
    transition: 0.3s;
    letter-spacing: 0.5px;
    color: #646464;
  }
  .ef:focus ~ label,
  .cp_iptxt.ef ~ label {
    font-size: 12px;
    top: -16px;
    transition: 0.3s;
    color: #646464;
  }
`;

const NewsLetter = () => {
  return (
    <div className="mt-20 ">
      <h2 className="text-center">News Letter</h2>
      <Input className="flex justify-center mt-10">
        <div className="cp_iptxt">
          <input className="ef" type="email" placeholder="" />
          <label>Email</label>
          <span className="focus_line"></span>
        </div>
        <div className="mt-5">
          <CustomBtn
            className="border border-primary border-solid"
            button="SUBMIT"
          />
        </div>
      </Input>
    </div>
  );
};

export default NewsLetter;
