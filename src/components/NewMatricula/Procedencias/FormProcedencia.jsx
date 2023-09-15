import { Card, Text, Divider, Bold, Icon } from "@tremor/react";
import { DocumentPlusIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import React, { useState, useEffect } from "react";
const FormProcedencia = () => {
    const navigate = useNavigate() //habilita la variable navegacion -->nos redigira una vez realizado la insercicon
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [_grado_Inicio, set_Grado_Inicio] = useState(["PRE-JARDIN", "JARDIN", "PARVULOS", "TRANSICION", "PRIMERO", "SEGUNDO", "TERCERO", "CUARTO", "QUINTO", "SEXTO", "SEPTIMO", "OCTAVO", "NOVENO", "DECIMO", "ONCE"]);
    const [_grado_Fin, set_Grado_Fin] = useState(["JARDIN", "PARVULOS", "TRANSICION", "PRIMERO", "SEGUNDO", "TERCERO", "CUARTO", "QUINTO", "SEXTO", "SEPTIMO", "OCTAVO", "NOVENO", "DECIMO", "ONCE"]);
    const [regProcedencia, setProcedencia] = useState([]); //array data-procedencia

    function notificacion(text, type) {
        if (type === 'succes') {
            toast.success(text, { autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT })
        }
    }

    //validacion sumbit formulario
    const customSubmit = (data) => {
        // console.log(data);
        setProcedencia(arr => [...arr, data]);
        notificacion('Registro agregado', 'succes');
        //una vez validado el form vacia los campos del mismo para un nuevo registro
        setValue("ciudad_procedencia", "");
        setValue("colegio_procedencia", "");
        setValue("g_inicio", "");
        setValue("g_fin", "");
        setValue("motivo_retiro", "");
        setValue("repitente", "");



    };

    useEffect(() => { /** si array se carga en tiempo de ejecucion -- envia al local storaje */
        const formProcedencia = JSON.parse(localStorage.getItem("form_procedencias"));
        // console.log(regProcedencia.length);
        if (regProcedencia.length != 0) {
            if (formProcedencia != null) { //SUMA DE LA DATA DEL LOCAL STORAGE A LA INGRESADA EN EL FORM
                const data = []
                for (let key in formProcedencia) {//Extraera el contenido del objeto del local storaje, creando un array del mismo
                    data.push(formProcedencia[key]);
                }

                for (let index = 0; index < regProcedencia.length; index++) {//Al array de la data del objeto del local storaje se le suma el array del formulario
                    data.push(regProcedencia[index]);
                }

                // console.log("Nuevo array ----------------------");
                // console.log(data);
                localStorage.setItem('form_procedencias', JSON.stringify(data)); //form -->send -- localStorage
            } else {
                // console.log('Primer cargue');
                localStorage.setItem('form_procedencias', JSON.stringify(regProcedencia)); //form -->send -- localStorage
            }

        }
    }, [regProcedencia]);

    return (
        <Card>
            <form className="w-full justify-center" onSubmit={handleSubmit(customSubmit)}>

                <Text>Ubicacion y nombre del colegio:</Text>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Ciudad
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ciudad"{...register("ciudad_procedencia", {
                            required: true,
                            minLength: 4,
                            pattern: /[A-Za-z]{4,45}/,
                        })}
                        />
                        {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                        {errors.ciudad_procedencia?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{" "}
                        {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                        {errors.ciudad_procedencia?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                        )}
                        {errors.ciudad_procedencia?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Nombre Colegio
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Colegio"
                            {...register("colegio_procedencia", {
                                required: true,
                                minLength: 4,
                                pattern: /[A-Za-z]{4,45}/,
                            })} />
                        {errors.colegio_procedencia?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{/* errors.name?.type === 'required' --> encadenamiento opcional */}
                        {errors.colegio_procedencia?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                        )}
                        {errors.colegio_procedencia?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}

                    </div>
                </div>

                <Divider />
                {/**  Periodo año en el que se inscribio*/}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Grado Inicio
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Grado Inicio"
                            {...register("g_inicio", {
                                required: true,
                                minLength: 4,
                                pattern: /[A-Za-z]{4,45}/,
                            })} />
                        {errors.g_inicio?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{/* errors.name?.type === 'required' --> encadenamiento opcional */}
                        {errors.g_inicio?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                        )}
                        {errors.g_inicio?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Grado Fin
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Grado Fin"
                            {...register("g_fin", {
                                required: true,
                                minLength: 4,
                                pattern: /[A-Za-z]{4,45}/,
                            })} />
                        {errors.g_fin?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{/* errors.name?.type === 'required' --> encadenamiento opcional */}
                        {errors.g_fin?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                        )}
                        {errors.g_fin?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Repitente?
                        </label>
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            {...register("repitente")} />
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Si</label>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Motivo Retiro
                        </label>
                        <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Porque?"
                            {...register("motivo_retiro", {
                                minLength: 4,
                                pattern: /[A-Za-z]{4,45}/,
                            })}
                        />
                        {errors.motivo_retiro?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                        )}
                        {errors.motivo_retiro?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                    </div>

                </div>
                {/** Fin de Pagina */}
                <Divider />
                <button type="submit">
                    <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">
                        {" "}
                        {/**items-center -- alinear contenido en X */}
                        <Text color="slate">
                            <Bold>Agregar registro</Bold>
                        </Text>
                        <Icon
                            variant="solid"
                            icon={DocumentPlusIcon}
                            size="xs"
                            color="slate"
                        />
                    </div>
                </button>
                <ToastContainer /> {/* Necesario para que la notifacion se muestre --------------------- */}
            </form>
        </Card>
    )
}

export default FormProcedencia