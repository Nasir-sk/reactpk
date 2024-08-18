import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <div className="signup-container">
    <form className="signup-form">
      <h2>Login</h2>
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
        Login
      </button>
      <div className='form-group'>
      <p>Already have an account <Link to='/signup'>Sign Up</Link></p>
      
    </div>
    </form>
  </div>
  )
}
