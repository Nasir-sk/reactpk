import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Navbar from './components/Navbar'
import About from './components/About'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeList from './pages/EmployeeList'
import Profile from './pages/Profile'
import Logout from './components/Logout'
import PrivateRoute from './components/PrivateRoute'
import CreateEmployee from './pages/CreateEmployee'
import EditEmployee from './pages/EditEmployee'

function App() {
  return (
   <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<PrivateRoute/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/employee-list' element={<EmployeeList/>}></Route>
          <Route path='/create-employee' element={<CreateEmployee/>}></Route>
          <Route path='/edit-emp/:id' element={<EditEmployee/>}></Route>
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
