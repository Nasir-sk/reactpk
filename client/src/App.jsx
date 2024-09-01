import './App.css' 
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import About from './components/About'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import UpdateProduct from './pages/UpdateProduct'
import Profile from './pages/Profile'
import Logout from './components/Logout'
import PrivateRoute from './components/PrivateRoute'

function App() {

 
  return (
   <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/add-product' element={<AddProduct/>}></Route>
          <Route path='/update-product' element={<UpdateProduct/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/logout' element={<Logout/>}></Route>
          </Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
