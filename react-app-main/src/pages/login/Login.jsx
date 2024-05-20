// import axios from "axios";
// import { useContext, useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { Context } from "../../context/Context";
// import "./login.css";

// export const Login = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const { dispatch, isFetching } = useContext(Context);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("http://localhost:5000/users/login", {
//         email: emailRef.current.value,
//         password: passwordRef.current.value,
//       });
//       localStorage.setItem("token", res.data.token); // Set token in localStorage
//       dispatch({ type: "LOGIN_SUCCESS", payload: res.data && window.location.replace("/")}); // Update dispatch with user data
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE" });
//     }
//   };  

//   return (
//     <div className="login">
//       <span className="loginTitle">Login</span>
//       <form className="loginForm" onSubmit={handleSubmit}>
//         <label>Email</label>
//         <input
//           type="email"
//           className="loginInput"
//           placeholder="Enter your email..."
//           ref={emailRef}
//         />
//         <label>Password</label>
//         <input
//           type="password"
//           className="loginInput"
//           placeholder="Enter your password..."
//           ref={passwordRef}
//         />
//         <button className="loginButton" type="submit" disabled={isFetching}>
//           Login
//         </button>
//       </form>
//       <button className="loginRegisterButton">
//         <Link className="link" to="/register">
//           Register
//         </Link>
//       </button>
//     </div>
//   );
// }


import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import "./login.css";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${window.location.origin}/users/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user }); // Dispatch user data
      window.location.replace("/"); // Redirect to home after successful login
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          className="loginInput"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};
