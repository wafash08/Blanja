import React, { useState } from "react";
import Container from "../../../components/base/Container";
import InputField from "../../../components/base/InputField";
import Button from "../../../components/base/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterSeller = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    storeName: "",
    password: "",
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
        phoneNumber: form.phoneNumber,
        storeName: form.storeName
      })
      .then((res) => {
        console.log(res);
        alert(`Register Succeed`);
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err.response);
        for (const key in err.response.data ) {
            if (err.response.data[key].failedField == "Customer.Password") {
                alert(
                  `Password should contain more than 8 digit and at least have an uppercase letter, a special character, and a number`
                );
              }
              if (err.response.data[key].failedField == "Customer.Email") {
                alert(`Should input a valid Email!!!`);
              }
              if (err.response.data[key].failedField == "Customer.Name") {
                alert(`Name should be atleast more than 1 characters`);
              }
              if (err.response.data[key].failedField == "Customer.PhoneNumber") {
                alert(
                  `Phone number should be in valid format and more than 10 digits`
                );
              }
              if (err.response.data[key].failedField == "Customer.StoreName") {
                alert(`Store name should be more than 2 characters`);
              }
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
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          value={form.phoneNumber}
          placeholder="Phone Number"
          className={"w-full"}
        />
        <InputField
          type="text"
          name="storeName"
          onChange={handleChange}
          value={form.storeName}
          placeholder="Store Name"
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

export default RegisterSeller;
