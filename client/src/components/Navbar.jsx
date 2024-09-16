import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState} from 'react';
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
            {/* <button className="sidebar-toggle" onClick={toggleSidebar}>
                &#9776;
            </button> */}
            <img
              alt='logo'
              className='logo'
              src='https://media.licdn.com/dms/image/v2/C560BAQE0YLKt7EeMZw/company-logo_200_200/company-logo_200_200/0/1630645895449/dealsdray_logo?e=2147483647&v=beta&t=Wx__HB2mc1s25fWixbjB1xK9CnvugVlKnQhnKsRCtGI'
            />
               
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/"><li>Home</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/employee-list"><li>Employee List</li></NavLink>
            <NavLink className={(e)=>{return e.isActive?"red": ""}} to="/profile"><li>{JSON.parse(auth).name}</li></NavLink>
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
