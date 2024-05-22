import React, { useState } from "react";
import Container from "../../../components/base/Container";
import InputField from "../../../components/base/InputField";
import Button from "../../../components/base/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterCustomer = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BE_URL}auth/customer`, {
        name: form.name,
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        console.log(res);
        alert(`Register Succeed`);
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data[0].failedField == "Customer.Password") {
          alert(
            `Password should contain more than 8 digit and at least have an uppercase letter, a special character, and a number`
          );
        } else if (err.response.data[0].failedField == "Customer.Email") {
          alert(`Should input a valid Email!!!`);
        } else if (err.response.data[0].failedField == "Customer.Name") {
          alert(`Name should be atleast more than 1 characters`);
        }
        alert(`register failed`);
      });
  };
  return (
    <>
      <div className="w-[400px] h-auto flex flex-col justify-start my-5 gap-6">
        <InputField
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="Name"
          className={"w-full"}
        />
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

      <div className="w-[400px] h-auto mb-8 mt-8">
        <Button onClick={handleSubmit}>Register</Button>
      </div>

      <div className="w-[400px] h-auto">
        <p className="text-[14px] text-[#222222] font-[400] text-center">
          Already have an account?
          <Link
            to="/login"
            className="text-[14px] text-[#DB3022] font-[400] text-center"
          >
            {" "}
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegisterCustomer;
