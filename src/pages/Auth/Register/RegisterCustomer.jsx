// BlanjaWebsiteProject/BlanjaFE/src/pages/Auth/Register/RegisterCustomer.jsx
import React, { useState } from "react";
import InputField from "../../../components/base/InputField";
import Button from "../../../components/base/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import AlertCard from "../../../components/base/AlertCard";
import Swal from 'sweetalert2'

const RegisterCustomer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnameArray = pathname.split("/");
  const role = pathnameArray[2];
  const [validation, setValidation] = useState([]);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("");
  // const [isSent, setIsSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(role);
    axios
      .post(`${import.meta.env.VITE_BE_URL}register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        role: "customer",
      })
      .then((res) => {
        console.log(res);
        Swal.fire("Register Succeed").then(() => {
          navigate(`/login`)
        })
        // setAlertMessage(res.data.message);
        // setAlertType("SUCCESS");
        // setIsSent(true);
      })
      .catch((err) => {
        console.log(err.response);
        setValidation(err.response.data.errors);
        Swal.fire({
          title: err.response.data.message,
          showConfirmButton: false,
          showDenyButton: true,
          denyButtonText: 'OK',
          showCloseButton: true
        })
        // setAlertMessage(err.response.data.message);
        // setAlertType("ERROR");
      });
  };

  const afterSubmission = (e) => {
    e.preventDefault();
  };

  // const handleClickAlert = () => {
  //   setAlertMessage("");
  //   setAlertType("");
  //   if (isSent === true) {
  //     navigate(`/login`);
  //   }
  // };

  return (
    <form onSubmit={afterSubmission} className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
      {/* {alertMessage && (
        <AlertCard
          alertMessage={alertMessage}
          alertType={alertType}
          onClick={handleClickAlert}
        />
      )} */}

      <div className="w-full flex flex-col justify-start my-5 gap-6">
        <InputField
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="Name"
          className="w-full"
          validation={validation}
        />
        <InputField
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email"
          className="w-full"
          validation={validation}
        />
        <InputField
          type="tel"
          name="phone"
          onChange={handleChange}
          value={form.phone}
          placeholder="Phone Number"
          className="w-full"
          validation={validation}
        />
        <InputField
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          className="w-full"
          validation={validation}
        />
      </div>

      <div className="w-full h-auto mb-8 mt-8">
        <Button onClick={handleSubmit} className="w-full">Register</Button>
      </div>

      <div className="w-full h-auto">
        <p className="text-[14px] text-[#222222] font-[400] text-center mb-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#DB3022]">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterCustomer;
