import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
export default function SignUp() {
  
  const [name, setName]=useState("");
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
    console.warn(name, email, password);
    let result = await fetch('http://localhost:5000/signup',{
      method: 'post',
      body: JSON.stringify({name, email, password}),
      headers:{ 'Content-Type':'application/json'}
    })
    result = await result.json()
    console.log(result);
    localStorage.setItem("user",JSON.stringify(result))
    navigate('/');
    
  }
  return (
    <div className="signup-container">
    <div className="signup-form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          autoComplete='off'
          placeholder='Enter your name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
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
      <button  className="submit-button" onClick={collectData}>
        Sign Up
      </button>
      <div className='form-group'>
      <p>Already have an account <Link to='/login'>Login</Link></p>
      
    </div>
    </div>
  </div>
  )
}
