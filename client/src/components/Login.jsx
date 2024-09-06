import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [errs, setErrs] = useState({});

  const validateInputs=()=>{
    const newErrs = {};

    const emailRegex = /^[^\@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
      newErrs.email = "Email is required";
    }else if(!emailRegex.test(email)){
      newErrs.email = "Invalid email formate";
    }

    if(!password){
      newErrs.password = "Password is required";
    }else if(password.length < 8){
      newErrs.password = "Password must be at least 8 characters"
    }

    setErrs(newErrs);
    return Object.keys(newErrs).length === 0;
  }

  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  })

  const collectData= async ()=>{
    if(validateInputs()){
      try{
            console.warn(email, password);
            let result = await fetch('http://localhost:5000/login',{
              method: 'post',
              body: JSON.stringify({email, password}),
              headers:{ 'Content-Type':'application/json'}
            })
  
    result = await result.json()
    console.log(result);
    if(result.name){
      localStorage.setItem("user",JSON.stringify(result))
      navigate('/');
    }else{
      alert("please enter correct details");
    }
  } catch (error) {
    // setErrors([{ msg: 'Something went wrong. Please try again.' }]);
  }
 }
    
  }

  return (
    <div className="signup-container">
    <div className="signup-form">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete='off'
          placeholder='Enter your email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        {errs.email && <p>{errs.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          autoComplete='off'
          placeholder='Enter Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        {errs.password && <p>{errs.password}</p>}
      </div>
      <button type="submit" className="submit-button"  onClick={collectData}>
        Login
      </button>
      <div className='form-group'>
      <p>Don't have an account <Link to='/signup'>Sign Up</Link></p>
      
    </div>
    </div>
  </div>
  )
}
