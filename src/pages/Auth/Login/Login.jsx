import React, { useEffect, useState } from "react";
import Container from "../../../components/base/Container";
import InputField from "../../../components/base/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/base/Button";
// import AlertCard from "../../../components/base/AlertCard";
import BlanjaLogo from "../../../assets/blanja-logo.png"
import Swal from 'sweetalert2'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const [alertMessage, setAlertMessage] = useState("");
  // const [alertType, setAlertType] = useState("");
  // const [isSent, setIsSent] = useState(false);
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
        Swal.fire("Login Succeed").then(() => {
          navigate(`/`)
        })
        // setAlertMessage(res.data.message);
        // setAlertType("SUCCESS");
        // setIsSent(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data.message == "Validation failed") {
          // setAlertMessage("Invalid password");
          // setAlertType("ERROR");
          Swal.fire({
            title: "Invalid email or password",
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: 'OK',
            showCloseButton: true
          })
        } else {
          // setAlertMessage(err.response.data.message);
          // setAlertType("ERROR");
          Swal.fire({
            title: err.response.data.message,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: 'OK',
            showCloseButton: true
          })
        }
      });
  };

  const afterSubmission = (e) => {
    e.preventDefault();
  };
  // const handleClickAlert = () => {
  //   setAlertMessage("");
  //   setAlertType("");
  //   if (isSent === true) {
  //     navigate(`/`);
  //   }
  // };

  return (
    <Container
      className="
        max-sm:max-w-[640px] max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:mt-20 max-sm:font-metropolis
        sm:max-w-[1156px] sm:flex sm:flex-col sm:justify-center sm:items-center sm:mt-20 sm:font-metropolis
        "
    >
      {/* {alertMessage && (
        <AlertCard
          alertMessage={alertMessage}
          alertType={alertType}
          onClick={handleClickAlert}
        />
      )} */}
      <div className="
      max-sm:w-full max-sm:flex max-sm:justify-center max-sm:mb-10
      sm:w-full sm:flex sm:justify-center sm:mb-10
      ">
        <img
          src={BlanjaLogo}
          alt="blanja-image"
          className="w-[135px] h-[50px]"
        />
      </div>
      <div className="
      max-sm:w-full
      sm:w-full
      ">
        <p className="
        max-sm:text-[18px] max-sm:text-[#222222] max-sm:font-extrabold max-sm:flex max-sm:justify-center
        sm:text-[18px] sm:text-[#222222] sm:font-extrabold sm:flex sm:justify-center
        ">
          Please login with your account
        </p>
      </div>
      <form onSubmit={afterSubmission}>
        <div className="
        max-sm:w-[300px] max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:justify-start max-sm:my-5 max-sm:gap-6
        sm:w-[400px] sm:h-auto sm:flex sm:flex-col sm:justify-start sm:my-5 sm:gap-6
        ">
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
        <div className="
        max-sm:w-[300px] max-sm:h-auto max-sm:flex max-sm:justify-end max-sm:mb-5
        sm:w-[400px] sm:h-auto sm:flex sm:justify-end sm:mb-5
        ">
          <p className="
          max-sm:text-[#DB3022] max-sm:text-[14px] max-sm:font-[400]
          sm:text-[#DB3022] sm:text-[14px] sm:font-[400]">
            Forgot password?
          </p>
        </div>

        <div className="
        max-sm:w-[300px] max-sm:h-auto max-sm:mb-8
        sm:w-[400px] sm:h-auto sm:mb-8">
          <Button onClick={handleSubmit}>Login</Button>
        </div>

        <div className="
        max-sm:w-[300px] max-sm:h-auto
        sm:w-[400px] sm:h-auto
        ">
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
