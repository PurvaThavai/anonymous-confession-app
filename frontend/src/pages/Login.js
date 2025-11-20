// “My login page is a React component that allows both users and admins to log in.
// It uses useState to manage inputs and Axios to send login details to the backend.
// Depending on the selected role, it calls either /users/login or /admins/login.
// The backend returns a JWT token, which I store in localStorage, and then navigate the user to their respective dashboard.
// If the credentials are invalid, an error message is displayed.”

// need to import react to uses its components 
// use state : react hook - manage components (like form inputs)
import React, { useState } from "react";
// axios : library - make http request to the beackend
import axios from "axios";
// useNavigate : react router hook - to navigate to another page after successful login (dashboard)
import { useNavigate } from "react-router-dom";

// 1
// this react functional components for login 
//- this page user will see when he will visit /login
export default function Login() { 
  //created state variables
  const [role, setRole] = useState("user"); //set default value as user
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); // stores error message
  const [loading, setLoading] = useState(false); // boolean value while waiting fro server response
  const nav = useNavigate(); // function from useNavigate() to redirect user to next page after login

// 3
//pasreJwt function - token decoder : decode the JWT token returned by the backend - helps to check whether the person is loggedis is admin or user
  function parseJwt(token) { //extract and decode payload part of JWT (header,payload, signature) 
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64)); //decode it from Base64 // JSON.parse() : convert decoded string into js object
    } catch (e) {
      return {};
    }
  }

// 2
// score login logic function  
//trigger when the user submit the login form
//async : allows to handle asynchromous (delayed) operations - (fetching data from backend, reading file, waiting timers) - code doesnot wait for one task to finish before moving to the next it keeps going
  async function handleLogin(e) {
    e.preventDefault(); // stop default from behavior (page reload)
    setError("");
    setLoading(true); //clear old error and set loading to true


    //depending on selected role will accept the values
    try {
      let url = "";
      let body = {};

      if (role === "user") {
        url = "http://localhost:4900/users/login";
        body = { name: identifier, password };
      } else if (role === "admin") {
        url = "http://localhost:4900/admins/login";
        body = { phone: identifier, password };
      }


      // sends login credintial to backend using axios
      // await : it will pause until get response
      // token : extracts JWT from backend 
      // message : success message from backend
      const response = await axios.post(url, body);
      const { token, message } = response.data;

      //store token and user role in browser storaeg so the app remebers who is logged in even after refresh
      //currently running the react app locally so data is visible only for spefic domain 
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);

      alert(message);

      //decodes token using parseJwt to check the role
      const payload = parseJwt(token);
      if (payload.role === "admin") nav("/admin");
      else nav("/user");
    } catch (err) { // if doesnt match then will give error in console and display error message to user
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally { //executed whether login succeed or fail - stop loggin in 
      setLoading(false);
    }
  }

  return (
    <div
      className="py-5 d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      {/*  Form Container theme */}
      <div
        className="col-md-4 p-5 rounded-4"
        style={{
          background: "linear-gradient(125deg, #000000, #cf0f47 60%, #000000)", 
          color: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 4px 15px rgba(207, 15, 71, 0.3)", 
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#ffdeee" }}>
          Login 💌
        </h2>

        {error && (
          <div
            className="alert alert-danger py-2 text-center"
            style={{ backgroundColor: "#ffffffff", border: "none", color: "#6a0000" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* Role Selection */}
          <div className="mb-3 text-start">
            <label className="form-label" style={{ color: "#FFDEDE" }}>
              Login as:
            </label>
            <select
              className="form-select border-0"
              style={{
                backgroundColor: "#fff",
                color: "#cf0f47",
                fontWeight: "500",
              }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Username / Phone */}
          <input
            className="form-control mb-3 border-0"
            style={{
              backgroundColor: "#fff",
              color: "#cf0f47",
              fontWeight: "500",
            }}
            placeholder={
              role === "user" ? "Enter Username" : "Enter Admin Phone"
            }
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          {/* Password */}
          <input
            className="form-control mb-4 border-0"
            style={{
              backgroundColor: "#fff",
              color: "#cf0f47",
              fontWeight: "500",
            }}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            className="btn w-100 fw-bold"
            type="submit"
            style={{
              background: "white",
              color: "#ff1053ff",
              border: "none",
              padding: "10px 0",
              borderRadius: "10px",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
