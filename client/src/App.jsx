import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Login from './components/Login'
import Home from './components/Home'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    },
    {
      path:"about",
      element:<><Navbar/><About/></>
    }
  ])

  return (
   <div>
    <RouterProvider router={router}/>
   </div>
  )
}

export default App
