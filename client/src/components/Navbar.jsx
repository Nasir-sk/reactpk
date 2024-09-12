import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar() {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
  }

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };



  return (
    <div>
        <nav className='navbar'>
        { auth ? 
        <>
            <div className="navbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                &#9776;
            </button>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/"><li>Home</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/products"><li>Products</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/add-product"><li>Add Products</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/profile"><li>Profile ({JSON.parse(auth).name})</li></NavLink>
            </div>
            <div className='navbar-right'>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} onClick={logout} to="/signup"><li>Logout</li></NavLink>
            </div>
            </>
            : <>
            <div className='navbar-right'>
              <NavLink className={(e)=>{return e.isActive?"red": ""}}  to="/signup"><li>Signup</li></NavLink>
              <NavLink className={(e)=>{return e.isActive?"red": ""}}  to="/login"><li>Login</li></NavLink>
              </div>
            </>
          }
            
        </nav>
        <aside  className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
            <Link className='sidebar-link'to="/"><li>Home</li></Link>
            <Link className='sidebar-link' to="/about"><li>About</li></Link>
            <Link className='sidebar-link' to="/update"><li>Recent Update</li></Link>
        </aside>
    </div>
  )
}
