import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
export default function SignUp() {
  return (
    <div className="signup-container">
    <form className="signup-form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete='off'
          placeholder='Enter your name'
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete='off'
          placeholder='Enter your email'
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete='off'
          placeholder='Enter Password'
        />
      </div>
      <button type="submit" className="submit-button">
        Sign Up
      </button>
      <div className='form-group'>
      <p>Already have an account <Link to='/login'>Login</Link></p>
      
    </div>
    </form>
  </div>
  )
}
