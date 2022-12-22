import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({name:"", email: "", password: "" });
  
    const handleChange = (e) => {
      setCredentials({ ...credentials , [e.target.name]: e.target.value });
    }; 
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(credentials);
      console.log(process.env.REACT_APP_SIGNUP_URL);
      const response = await fetch(process.env.REACT_APP_SIGNUP_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      if(json.success){
          localStorage.setItem("token",json.token);
          navigate("/");
  
      }else{
        console.log(json.error);
          alert(json.error)
      }
      console.log(json);
    };
  return (
    <div>
      <form className='my-3' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' onChange={handleChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" className="form-control" id="password" name='password' onChange={handleChange} required/>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
