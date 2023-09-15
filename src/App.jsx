import React from 'react';
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
import { ToastContainer } from 'react-toastify' //libreria de notifaciones
import REstudiante from './components/NewMatricula/REstudiante';
import Rmatricula from './components/NewMatricula/Rmatricula';
import DashboardProcedencia from './components/NewMatricula/Procedencias/DashboardProcedencias';
import Rsalud from './components/NewMatricula/Rsalud';
import DashBoardAcudiente from './components/NewMatricula/Acudientes/DashboardAcudiente';
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer /> {/** Necesario para que la notifacion se muestre --------------------- */}
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route exact path='/dashboard' element={<DashboardBase />} />
            <Route exact path='/Restudiante' element={<REstudiante />} />
            <Route exact path='/Rmatricula' element={<Rmatricula />} />
            <Route exact path='/Rprocedencia' element={<DashboardProcedencia />} />
            <Route exact path='/Rsalud' element={<Rsalud />} />
            <Route exact path='/Racudiente' element={<DashBoardAcudiente />} />

          </Route>
          <Route exact path='/' element={<DashboardLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App