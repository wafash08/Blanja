import React, { useEffect, useState } from "react";
import Container from "../../../components/base/Container";
import InputField from "../../../components/base/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/base/Button";
import AlertCard from "../../../components/base/AlertCard";
import BlanjaLogo from "../../../assets/blanja-logo.png"

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isSent, setIsSent] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_BE_URL}login`, {
        email: form.email,
        password: form.password,
      })
      .then(async (res) => {
        console.log(res);
        const { token, refresh_token, role, id } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("role", role)
        localStorage.setItem("id", id)
        setAlertMessage(res.data.message);
        setAlertType("SUCCESS");
        setIsSent(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.message == "Validation failed") {
          setAlertMessage("Invalid password");
          setAlertType("ERROR");
        } else {
          setAlertMessage(err.response.data.message);
          setAlertType("ERROR");
        }
      });
  };

  const afterSubmission = (e) => {
    e.preventDefault();
  };
  const handleClickAlert = () => {
    setAlertMessage("");
    setAlertType("");
    if (isSent === true) {
      navigate(`/`);
    }
  };

  return (
    <Container
      className={
        "w-[1156px] flex flex-col justify-center items-center mt-20 font-metropolis"
      }
    >
      {alertMessage && (
        <AlertCard
          alertMessage={alertMessage}
          alertType={alertType}
          onClick={handleClickAlert}
        />
      )}
      <div className="w-full flex justify-center mb-10">
        <img
          src={BlanjaLogo}
          alt="blanja-image"
          className="w-[135px] h-[50px]"
        />
      </div>
      <div className="w-full">
        <p className="text-[18px] text-[#222222] font-extrabold flex justify-center">
          Please login with your account
        </p>
      </div>
      <form onSubmit={afterSubmission}>
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
          <p className="text-[#DB3022] text-[14px] font-[400]">
            Forgot password?
          </p>
        </div>

        <div className="w-[400px] h-auto mb-8">
          <Button onClick={handleSubmit}>Login</Button>
        </div>

        <div className="w-[400px] h-auto">
          <p className="text-[14px] text-[#222222] font-[400] text-center">
            Don't have an account yet?
            <Link
              to="/register/customer"
              className="text-[14px] text-[#DB3022] font-[400] text-center"
            >
              {" "}
              Register here
            </Link>
          </p>
        </div>
      </form>
    </Container>
  );
};

export default Login;
