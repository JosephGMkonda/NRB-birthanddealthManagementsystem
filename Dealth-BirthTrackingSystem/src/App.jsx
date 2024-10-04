import React from 'react'
import Sidebar from './components/Sidebar'

import {BrowserRouter,Navigate,Outlet, Routes, Route} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'

import { PrivateRoute } from './components/PrivateRoute'

import Dashboard from './pages/Dashboard'
import DealthCertificate from './pages/DealthCerficate'
import BirthCertificate from './pages/BirthCerticificate'
import Report from './pages/Report'




const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login"/>
}


const App = () => {
  return (

    <main className="">

      <BrowserRouter>
      <Routes>

        <Route path='/'element = { <PrivateRoute> <Dashboard/></PrivateRoute>}/>
        <Route path='/Birth' element ={<PrivateRoute> <BirthCertificate/> </PrivateRoute>}/>
        <Route path='/death' element={<PrivateRoute><DealthCertificate/></PrivateRoute>}/>
        <Route path='/Report' element={<PrivateRoute><Report/></PrivateRoute>}/>
        

        <Route path="/login" element={<SignIn/>}/>
      </Routes>


      </BrowserRouter>

    </main>
      //  <div className='flex'>
      //   <div className='basis-[15%] h-[100vh]  border'>
      //     <Sidebar/>
      //   </div>
      //   <div className='basis-[85%] border'>

      //     <Dashboard/>
      //   </div>
      //   <div>
      //     <Outlet></Outlet>
      //   </div>

      //  </div>
  )
}

export default App
