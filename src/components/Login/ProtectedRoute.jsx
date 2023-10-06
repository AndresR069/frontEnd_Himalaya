
import { Navigate, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import axios from "axios";

const URI_VERIFICACION_LOGUEO = 'http://localhost:8000/himalayaSchool/authenticated';
const useAuth = () => {
  //get item from localstorage

  let token;
  const _token = localStorage.getItem("jwt")

  if (_token) {
    token = JSON.parse(_token)
    //console.log("token: --->", token)
  }
  if (token) {
    if (validacionToken(token)) {
      return {
        auth: true
        //role: token.role,
      }
    } else {
      return {
        auth: false
        //	role: null,
      }
    }
  } else {
    return {
      auth: false
      //	role: null,
    }
  }
}
//Logueo ususario
async function validacionToken(token) {
  await axios.post(URI_VERIFICACION_LOGUEO, {
    token: token
  }).then(res => {
    if (res.data === 'succes') {
      // console.log('OK');
      //console.log(res.data);
      return true

    } else {
      localStorage.removeItem("jwt") //remover token cuando sesion no valida
      return false
      // notificacion('Sesion invalida', 'error')
    }
  }).catch(error => {
    // notificacion('Fallo en el envio de datos', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
    console.log(error);
  })
}

const ProtectedRoute = ({
  redirectPath = '/'
}) => {

  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to={redirectPath} replace />
  } else {
    return <Outlet />
  }
};

export default ProtectedRoute;
