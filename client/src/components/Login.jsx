import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {

  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");

  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  })

  const collectData= async ()=>{
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
