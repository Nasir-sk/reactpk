import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Navbar() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div>
        <nav className='navbar'>
            <div className="navbar-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                &#9776;
            </button>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/products"><li>Products</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/add-product"><li>Add Products</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/profile"><li>Profile</li></NavLink>
            </div>
            <div className='navbar-right'>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/logout"><li>Logout</li></NavLink>
            </div>
        </nav>
        <aside  className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
        <button className="sidebar-tgl" onClick={toggleSidebar}>
                &#9776;
            </button>
            <Link className='sidebar-link'to="/"><li>Home</li></Link>
            <Link className='sidebar-link' to="/about"><li>About</li></Link>
            <Link className='sidebar-link' to="/update"><li>Recent Update</li></Link>
        </aside>
    </div>
  )
}
