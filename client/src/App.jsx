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

function App() {

 
  return (
   <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/Product' element={<Products/>}></Route>
          <Route path='/addProduct' element={<AddProduct/>}></Route>
          <Route path='/updateProduct' element={<UpdateProduct/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
