import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Icon } from "@iconify/react";
import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";
import "../STYLES/login.css"; // Assuming you have a CSS file for styling
const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [color, setcolor] = useState(false);
  const navigate = useNavigate();

  const handlecolor = () => {
    setcolor(!color);
  };

  const handlessubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = login;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userEmail = userCredential.user.email;
      if (userEmail === "edupulse360@gmail.com") {
        alert("Login Successful");
        navigate("/Dashboard");
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Invalid Credentials");
    }
    setlogin({ email: "", password: "" });
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setlogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={color ? "main-div-dark-login" : "main-div-login"}>
      <img src={logo} className="logo-header" alt="" />
      <h1 className={color ? "h-dark" : "h"}>Admin Login</h1>
      {color ? (
        <Icon
          icon="solar:sun-bold"
          className="sun-icon"
          onClick={handlecolor}
        />
      ) : (
        <Icon
          icon="line-md:moon-filled"
          className="moon-icon"
          onClick={handlecolor}
        />
      )}

      <form
        onSubmit={handlessubmit}
        className={color ? "form-login-dark" : "form-login"}
      >
        <div className="input-wrap">
          <label>Email Address:</label>
          <input
            type="email"
            className="inp1"
            placeholder="Email address"
            required
            name="email"
            value={login.email}
            onChange={handlechange}
          />
        </div>
        <div className="input-wrap">
          <label>Password:</label>
          <input
            type="password"
            className="inp2"
            placeholder="Password"
            required
            name="password"
            value={login.password}
            onChange={handlechange}
          />
        </div>
        <div className="input-wrap">
          <input type="submit" value="Login" />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
