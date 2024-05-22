import React, { useState } from "react";
import Container from "../../../components/base/Container";
import { NavLink, Outlet } from "react-router-dom";
import BlanjaLogo from "../../../assets/blanja-logo.png"


const Register = () => {
  return (
    <Container className={"w-[1156px] flex flex-col justify-center items-center mt-20"}>
      <div className="w-full flex justify-center mb-10">
        <img src={BlanjaLogo} alt="blanja-image" className="w-[135px] h-[50px]" />
      </div>

      <div className="w-full">
        <p className="text-[18px] text-[#222222] font-extrabold flex justify-center mb-8">Please register</p>
      </div>

      <div className="w-[400px] h-auto mb-8">
        <nav className='container w-full h-auto relative'>
          <ul className='list-none flex justify-center relative'>
            <li className="w-[123px] h-[48px] bg-[#FFFFFF] border border-[#9B9B9B] rounded-t-[4px] rounded-l-[4px] flex justify-center items-center text-[14px] font-[500] text-[#9B9B9B]"><NavLink to='/register/customer' className='no-underline w-full h-full text-center flex items-center justify-center'>Customer</NavLink></li>
            <li className="w-[123px] h-[48px] bg-[#FFFFFF] border border-[#9B9B9B] rounded-t-[4px] rounded-l-[4px] flex justify-center items-center text-[14px] font-[500] text-[#9B9B9B]"><NavLink to='/register/seller' className='no-underline w-full h-full text-center flex items-center justify-center'>Seller</NavLink></li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </Container>

  );
};

export default Register;
