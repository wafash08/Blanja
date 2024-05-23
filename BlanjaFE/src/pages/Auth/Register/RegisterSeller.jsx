import React, { useState } from "react";
import InputField from "../../../components/base/InputField";
import Button from "../../../components/base/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterSeller = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const pathnameArray = pathname.split("/")
  const role = pathnameArray[2]
  console.log(role);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
      .post(`${import.meta.env.VITE_BE_URL}register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: role
      })
      .then((res) => {
        console.log(res);
        alert(`Register Succeed: ${res.data.message}`);
        navigate(`/login`);
      })
      .catch((err) => {
        console.log(err.response);
        for (const key in err.response.data.errors) {
            alert(`${err.response.data.errors[key].error_message}`)
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
          placeholder="Store Name"
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
          type="tel"
          name="phone"
          onChange={handleChange}
          value={form.phone}
          placeholder="Phone Number"
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
