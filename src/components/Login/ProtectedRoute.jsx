
import { Navigate, Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import axios from "axios";

const URI_VERIFICACION_LOGUEO = 'http://localhost:8000/himalayaSchool/authenticated';
const useAuth = () => {
  //get item from localstorage

  let token;
  let ingreso;
  const _token = localStorage.getItem("jwt")

  if (_token) {
    token = JSON.parse(_token)
    console.log("token: --->", token)
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
      console.log('OK');
      return true
      //console.log(res.data);
    } else {
      return false
      // notificacion('Sesion invalida', 'error')
    }
  }).catch(error => {
    // notificacion('Fallo en el envio de datos', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
    console.log(error);
  })
}
//------------------------------------------------------------------------------------------------
function notificacion(text, type) {
  if (type === 'error') {
    toast.error(text, { autoClose: 3000, toastId: customIdErr, position: toast.POSITION.BOTTOM_RIGHT })
  }
}

const ProtectedRoute = ({
  redirectPath = '/'
}) => {

  const { auth } = useAuth();

  if (!auth) {
    console.log("Ingreso");
    return <Navigate to={redirectPath} replace />
  } else {
    return <Outlet />
  }
};

export default ProtectedRoute;
