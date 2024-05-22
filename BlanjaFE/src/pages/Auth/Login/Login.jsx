import React, { useState } from "react";
import Container from "../../../components/base/Container";
import InputField from "../../../components/base/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/base/Button";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BE_URL}auth/login`, {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        console.log(res);
        const { token, refreshToken } = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        alert(`${res.data.message}`)
        navigate(`/`)
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
      <Container
        className={
          "w-[1156px] flex flex-col justify-center items-center mt-20 font-metropolis"
        }
      >
        <div className="w-full flex justify-center mb-10">
          <img
            src="./src/assets/blanja-logo.png"
            alt="blanja-image"
            className="w-[135px] h-[50px]"
          />
        </div>
        <div className="w-full">
          <p className="text-[18px] text-[#222222] font-extrabold flex justify-center">
            Please login with your account
          </p>
        </div>
        <div className="w-[400px] h-auto flex flex-col justify-start my-5 gap-6">
          <InputField
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Email"
            className={"w-full"}
          />
          <InputField
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            className={"w-full"}
          />
        </div>
        <div className="w-[400px] h-auto flex justify-end mb-5">
          <p className="text-[#DB3022] text-[14px] font-[400]">Forgot password?</p>
        </div>

        <div className="w-[400px] h-auto mb-8">
            <Button onClick={handleSubmit}>Login</Button>
        </div>

        <div className="w-[400px] h-auto">
          <p className="text-[14px] text-[#222222] font-[400] text-center">Don't have an account yet?<Link to="/register/customer" className="text-[14px] text-[#DB3022] font-[400] text-center"> Register here</Link></p>
        </div>

      </Container>
  );
};

export default Login;
