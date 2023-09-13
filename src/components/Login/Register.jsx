
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@tremor/react";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones

const Register = () => {
    const [_hidden, setHidden] = useState(true); //Para modificar la propiedad hidden (Ocultar)
    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    const customIdSucces = "custom-id-error";//Id toast error 
    const URI_NEW_USER = 'http://localhost:8000/himalayaSchool/register';//ruta para crear nuevo usuario
    const ocultElements = () => {
        setHidden(!_hidden);
    };
    //Formulario registrar usuario-------------------------------------------------------------------------
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    //procedimiento validar data y guardar
    const customSubmit = (data) => {
        saveDB(data.nombres, data.usuario, data.pass)
    };
    //Guardar ususario
    async function saveDB(nombres, usuario, pass) {
        await axios.post(URI_NEW_USER, {
            nombres: nombres,
            usuario: usuario,
            pass: pass
        }).then(res => {
            // setData(res.data);
            //console.log(res.data);
            if (res.data === 'succes') {
                notificacion('Usuario registrado', 'succes')
                //una vez validado el form vacia los campos del mismo para un nuevo registro
                setValue("nombres", "");
                setValue("usuario", "");
                setValue("pass", "");
                setTimeout(ocultElements(), 30000);
            } else { notificacion('Fallo en el envio de datos', 'error') }
        }).catch(error => {
            notificacion('Fallo en el envio de datos', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
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

        <div className={_hidden ? 'hidden' : ''}> {/**DIV PARA OCULTAR O MOSTRAR INGRESAR */}     {/**Registrarse *************************** */}
            {/**Boton para regresar al formulario de Ingresar*/}
            <ToastContainer /> {/** Necesario para que la notifacion se muestre --------------------- */}
            <Button icon={ArrowLeftOnRectangleIcon} size="xs" onClick={ocultElements} variant="primary">Regresar</Button>
            <h1 className="text-5xl font-semibold">Unete al equipo!</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Registre sus datos</p>
            <div className="mt-8">
                <form onSubmit={handleSubmit(customSubmit)}>
                    <div>
                        <label className="text-lg font-medium">Nombre completo</label>
                        <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingrese su nombre" type="text" {...register("nombres", {
                            required: true,
                            minLength: 4,
                            pattern: /[A-Za-z]{4,45}/,
                        })}
                        />
                        {errors.nombres?.type === "required" && (
                            <small className="text-red-500 text-xs italic mt-4">El campo no debe estar vacio</small>
                        )}
                        {errors.nombres?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                        {errors.nombres?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic mt-4">Ingrese nombre mayor a 4 caracteres</small>
                        )}
                    </div>
                    <div>
                        <label className="text-lg font-medium">Usuario</label>
                        <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingrese su usuario" type="text"{...register("usuario", {
                            required: true,
                            minLength: 4,
                            pattern: /[A-Za-z]{4,45}/,
                        })}
                        />
                        {errors.usuario?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no debe estar vacio</small>
                        )}
                        {errors.usuario?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                        {errors.usuario?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">Ingrese nombre mayor a 4 caracteres</small>
                        )}
                    </div>

                    <div>
                        <label className="text-lg font-medium">Contraseña</label>
                        <input className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent" placeholder="Ingresa tu contraseña" type="password"{...register("pass", {
                            required: true,
                            minLength: 4,
                        })}
                        />
                        {errors.pass?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">La clave debe ser mayor a 4 caracteres</small>
                        )}
                        {errors.pass?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no debe estar vacio</small>
                        )}
                    </div>

                    <div className="mt-8 flex flex-col gap-y-4">
                        {/*    TAILWIND CSS
       active:scale-[.98] propiedad de tailwind genera que cresca cuando se haga click
          transition-all para que no se vea cortada la animacion
          active:duration-75 dure un poco mas la animacion

          Cuando se pase el mouse por encima*************************************
          hover:scale-[1.01] se ponga grande cuando el mouse este encima hover
      */}

                        <button className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-yellow-500 text-white text-lg font-bold" type="submit">Registrarse</button>

                    </div>
                </form>
            </div>

        </div>
    )
}
export default Register;
