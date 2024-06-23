import React, { useState } from "react";
import axios from "axios";
import { authActions } from "../Store/index.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import '../Styles/Auth.css';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs , setInputs] = useState({
    name : '',
    email : '',
    password : ''
  })
  const [isSignup, setIsSignUp] = useState(false)
  
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }
  const sendData = async (type="login") => {
    
    const res = await axios.post(`https://mern-blog-app-backend-1.onrender.com/user/${type}` ,{
      name : inputs.name,
      email : inputs.email,
      password : inputs.password
    }).catch((err) => console.log(err))
    
    const data = await res.data;
    console.log(data)
    return data;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
     sendData("signup")
     .then((data) => localStorage.setItem('userId',data.user._id))
     .then(() => dispatch(authActions.login()))
     .then(() => navigate("/blogs"))
    }else{
      sendData()
      .then((data) => localStorage.setItem('userId', data.user._id))
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"))
    }
  }
  return (
    <div className="container-fluid p-0 d-flex justify-content-center w-100 auth-container">
      <div className="row w-100 p-0 d-flex justify-content-center">
        <div className="col-md-10 col-11 p-0">
           <div className= "card p-5" >
             <h2 className="card-title text-center">{`${isSignup ? 'Signup' : 'Login' }`}</h2>
             
             <div className="card-body">
              <form>
                 {isSignup && <div className="form-group ">
                   <label htmlFor="name">Name :</label>
                   <input type="text" className="form-control p-4" 
                   id="name"
                   name="name"
                   value = {inputs.name}
                   onChange={handleChange}/>
                 </div>}
                 
                 <div className="form-group mt-5">
                   <label htmlFor="email">Email :</label>
                   <input type="email" className="form-control p-4" 
                   id="email"
                   name="email"
                   value = {inputs.email}
                   onChange={handleChange}/>
                 </div>
                 
                 <div className="form-group mt-5">
                   <label htmlFor="password">Password :</label>
                   <input type="password" className="form-control p-4" 
                   id="password"
                   name="password"
                   value = {inputs.password}
                   onChange={handleChange}/>
                 </div>
                 
                 <button type="submit" className="btn btn-primary mt-5 w-100 p-3"
                   onClick={handleSubmit}>Submit</button>
                 <div className="w-100 d-flex justify-content-center mt-4">
                   <a href="#" className="d-block text-center" onClick={() => setIsSignUp(!isSignup)}>Change to {`${isSignup ? 'Login' : 'Signup'}`}</a>
                 </div>
                 
                 {!isSignup && 
                 <div className="w-100 d-flex mt-5">
                 <button className="btn btn-primary ml-auto forgot-btn">
                  Forgot Password ?
                 </button>
                 </div>}
              </form>
             </div>
           
           </div>
           
           
        </div>
      </div>
    
    </div>
 );
}

export default Auth;