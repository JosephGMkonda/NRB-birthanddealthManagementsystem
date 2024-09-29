import React from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/DashBoard/Dashboard'
import {BrowserRouter,Navigate,Outlet, Routes, Route} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import AuthLayout from './components/SignIn/AuthLayout'
import RootLayout from './components/pages/RootLayout/RootLayout'
import { PrivateRoute } from './components/PrivateRoute'
import Home from './components/pages/Home/Home'


const Logout = () => {
  localStorage.clear();
  return <Navigate to="/login"/>
}


const App = () => {
  return (

    <main className="">

      <BrowserRouter>
      <Routes>

        <Route 
        path='/'
        element = {
          <PrivateRoute>
              <Home/>
          </PrivateRoute>
        }
        />

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
