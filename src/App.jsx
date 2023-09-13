import React, { useState, useEffect } from 'react';
// import './App.css'
//Dashboard
import DashboardBase from './components/Dashboard/DashboardBase';
//Componentes Login
import DashboardLogin from './components/Login/DashboardLogin.jsx';
// import Login from './components/Login/Login.jsx';
import ProtectedRoute from './components/Login/ProtectedRoute.jsx'; //Protege las rutas en caso de no estar logueado
// import Register from './components/Login/Register.jsx';
//importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import axios from "axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer /> {/** Necesario para que la notifacion se muestre --------------------- */}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route exact path='/dashboard' element={<DashboardBase />} />
            {/* <Route exact path='/register' element={<Register />} /> */}
          </Route>
          <Route exact path='/' element={<DashboardLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App