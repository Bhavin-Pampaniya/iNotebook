import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
    let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials , [e.target.name]: e.target.value });
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    // console.log(process.env.REACT_APP_LOGIN_URL);
    const response = await fetch(process.env.REACT_APP_LOGIN_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if(json.success){
        localStorage.setItem("token",json.token);
        navigate("/");

    }else{
        alert("failed")
    }
    console.log(json);
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoComplete="on"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            autoComplete="on"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
