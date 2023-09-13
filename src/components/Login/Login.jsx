import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import { useNavigate, Navigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate(); //habilita la variable navegacion
    const URI_LOGUEO = 'http://localhost:8000/himalayaSchool/login';
    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    const customIdSucces = "custom-id-error";//Id toast error 

    //procedimiento validar data yloguear
    const customSubmitLogin = (data) => {
        //console.log(data);
        logueo(data.user, data.password)
    };
    //Formulario loguear usuario-------------------------------------------------------------------------
    const { register, handleSubmit, formState: { errors } } = useForm();
    //Logueo ususario
    async function logueo(usuario, pass) {
        // console.log(usuario + "-" + pass);
        await axios.post(URI_LOGUEO, {
            usuario: usuario,
            pass: pass
        }).then(res => {
            if (res.data.estado === 'succes') {
                // console.log(res.data);
                localStorage.setItem('jwt', JSON.stringify(res.data.token)); //-->send -- localStorage
               // <Navigate to="/dashboard" replace={true}/>
                navigate('/dashboard');
                notificacion('Bienvenido', 'succes')
            } else { notificacion('Datos incorrectos', 'error') }
        }).catch(error => {
            notificacion('Datos incorrectos', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
            console.log(error);
        })
    }

    //------------------------------------------------------------------------------------------------
    function notificacion(text, type) {
        if (type === 'error') {
            toast.error(text, { autoClose: 3000, toastId: customIdErr, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'succes') {
            toast.success(text, { autoClose: 4000, toastId: customIdSucces, position: toast.POSITION.BOTTOM_RIGHT })
        }
    }

    return (


        <div>
            {/**Ingresar********************************* */}
                <ToastContainer /> {/** Necesario para que la notifacion se muestre --------------------- */}
       
                <p className="font-medium text-lg text-gray-500 mt-4">Por favor ingrese sus datos</p>
                <div className="mt-8">
                    <form onSubmit={handleSubmit(customSubmitLogin)}>
                        <div>
                            <label className="text-lg font-medium">Usuario</label>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingresa tu usuario"{...register("user", {
                                required: true,
                                minLength: 4,
                                pattern: /[A-Za-z]{4,45}/,
                            })}
                            />
                            {errors.user?.type === "required" && (
                                <small className="text-red-500 text-xs italic mt-4">El campo no debe estar vacio</small>
                            )}
                            {errors.user?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                            {errors.user?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic mt-4">Ingrese usuario valido</small>
                            )}
                        </div>
                        <div>
                            <label className="text-lg font-medium">Contraseña</label>
                            <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingresa tu contraseña" type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 4,
                                })}
                            />
                            {errors.password?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">La clave debe ser mayor a 4 caracteres</small>
                            )}
                            {errors.password?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no debe estar vacio</small>
                            )}

                        </div>
                        {/* <div className="mt-8 flex justify-between items-center">         
                            <button className="font-medium text-base text-violet-500">Forgot password</button>
                        </div> */}
                        <div className="mt-8 flex flex-col gap-y-4">
                            {/*    TAILWIND CSS
                             active:scale-[.98] propiedad de tailwind genera que cresca cuando se haga click
                                transition-all para que no se vea cortada la animacion
                                active:duration-75 dure un poco mas la animacion

                                Cuando se pase el mouse por encima*************************************
                                hover:scale-[1.01] se ponga grande cuando el mouse este encima hover
                            */}
                            <button type="submit" className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yellow-500 text-white text-lg font-bold">Sign in</button>

                        </div>
                    </form>
                </div>
            </div>
    );
}
export default Login;