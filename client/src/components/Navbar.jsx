import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
        <nav className='navbar'>
            <div className="navbar-left">
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/products"><li>Products</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/add-product"><li>Add Products</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/profile"><li>Profile</li></NavLink>
            </div>
            <div className='navbar-right'>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/logout"><li>Logout</li></NavLink>
            </div>
        </nav>
    </div>
  )
}
