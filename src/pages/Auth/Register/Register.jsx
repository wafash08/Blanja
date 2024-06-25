// BlanjaWebsiteProject/BlanjaFE/src/pages/Auth/Register/Register.jsx
import React from "react";
import Container from "../../../components/base/Container";
import { NavLink, Outlet } from "react-router-dom";
import BlanjaLogo from "../../../assets/blanja-logo.png";

const Register = () => {
  return (
    <Container className="flex flex-col justify-center items-center mt-20 p-4 sm:p-6 md:p-8">
      <div className="w-full flex justify-center mb-10">
        <img src={BlanjaLogo} alt="blanja-image" className="w-[135px] h-[50px] md:w-[180px] md:h-[60px]" />
      </div>

      <div className="w-full">
        <p className="text-[18px] text-[#222222] font-extrabold flex justify-center mb-8 text-center sm:text-[20px] md:text-[22px]">
          Please register
        </p>
      </div>

      <div className="w-full max-w-[400px] h-auto mb-8">
        <nav className="w-full h-auto">
          <ul className="list-none flex justify-center">
            <li className="w-[45%] sm:w-[40%] md:w-[30%] h-[48px] bg-[#FFFFFF] border-l border-t border-b border-[#9B9B9B] rounded-l-[4px] flex justify-center items-center text-[14px] font-[500] text-[#9B9B9B]">
              <NavLink to='/register/customer' className='no-underline w-full h-full text-center flex items-center justify-center'>
                Customer
              </NavLink>
            </li>
            <li className="w-[45%] sm:w-[40%] md:w-[30%] h-[48px] bg-[#FFFFFF] border-t border-r border-b border-[#9B9B9B] rounded-r-[4px] flex justify-center items-center text-[14px] font-[500] text-[#9B9B9B]">
              <NavLink to='/register/seller' className='no-underline w-full h-full text-center flex items-center justify-center'>
                Seller
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </Container>
  );
};

export default Register;
