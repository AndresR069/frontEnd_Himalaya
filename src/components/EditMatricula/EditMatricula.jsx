import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, Metric, Text, Flex, Divider, Icon, Bold, Callout } from "@tremor/react";
import { ChevronDoubleRightIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones

const URI = 'http://localhost:8000/himalayaSchool/getEstu'
const URI_editar = 'http://localhost:8000/himalayaSchool/'
const EditMatricula = () => {
    /**variables de captura */
    const navigate = useNavigate(); //habilita la variable navegacion -->nos redigira una vez realizado la insercicon
    //React hook form -- seccion validaciones
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const { id } = useParams();  //--Capturar el id del estudiante ------------------
    // console.log("Id estudiante ---->" + id);

    //Obtener la data del estudiante - Consulta
    const SubmitBusqueda = async () => {
        const res = await axios.get(URI + id)

        if (res.status == '200') {
            const element = res.data;
            //cargue de data a campos visuales 
            for (let index = 0; index < element.length; index++) {
                const _element = element[index];
                let llaves = Object.keys(_element)
                let valores = Object.values(_element)
                for (let _index = 0; _index < llaves.length; _index++) {
                    //console.log(`${llaves[_index]} - ${valores[_index]}`);
                    setValue(llaves[_index], valores[_index])
                }
            }

        } else {
            notificacion('Fallo conexion DB', 'error')
            navigate('/dashboard')
        }
    }

    //Editar data ---------------------------
    const editar = async (data) => {
        const res = await axios.get(URI_editar,{
            data
        })

        if (res.status == '200') {

        } else {
            notificacion('Fallo conexion DB', 'error')
        }
    }

    //Ejecutar la funcion de busqueda al cargar el componente
    useEffect(() => {
        SubmitBusqueda();
    }, [])

    //procedimiento validar data y guardar
    const customSubmit = (data) => {
        console.log(data);
        editar(data)
        // alert("validacion exitosa");
        //localStorage.setItem('form_matricula', JSON.stringify(data)); //form -->send -- localStorage

        //navigate('/Rprocedencia') //navigate --> ruta para navegar una vez realizado el metodo de registro
    };

    //muestra notificacion segun el tipo y el texto enviados

    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    const customIdSucces = "custom-id-succes";//Id toast error 
    const customIdInfo = "custom-id-info";
    function notificacion(text, type) {

        if (type === 'error') {
            toast.error(text, { autoClose: 3000, toastId: customIdErr, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'succes') {
            toast.success(text, { autoClose: 3000, toastId: customIdSucces, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'info') {
            toast.info(text, { autoClose: 3000, toastId: customIdInfo, position: toast.POSITION.BOTTOM_RIGHT })
        }
    }
    return (
        <div className="grid min-h-screen max-h-max place-items-center bg-slate-200">
            {/** Centrar contenido del div --> CARD */}
            <Card
                className="max-w-3xl center"
                decoration="top"
                decorationColor="indigo"
            >
                <Metric className="justify-center">Hoja de vida estudiante</Metric>
                <Divider />
                <Callout className="mt-6 h-12 mb-8" title="Datos personales del estudiante" icon={CheckCircleIcon} color="teal">
                </Callout>

                {/* <Callout className="mt-4" title="Datos personales del estudiante" icon={CheckCircleIcon} color="teal">
                    All systems are currently within their default operating ranges.
                </Callout> */}
                {/* <Divider /> */}

                <form
                    className="w-full justify-center"
                    onSubmit={handleSubmit(customSubmit)}
                >
                    {/* FORM DATA ESTUDENT */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                Nombres (*)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-first-name"
                                type="text"
                                placeholder="Nombres"
                                {...register("estu_nombres", {
                                    pattern: /[A-Za-z]{3,45}/,
                                    required: true,
                                    minLength: 3,
                                })}
                            />
                            {errors.estu_nombres?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.estu_nombres?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.estu_nombres?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Apellidos (*)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Apellidos"
                                {...register("estu_apellidos", {
                                    required: true,
                                    minLength: 3,
                                    pattern: /[A-Za-z]{3,45}/,
                                })}
                            />{" "}
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.estu_apellidos?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.estu_apellidos?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.estu_apellidos?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Fecha Nacimiento (*)
                            </label>

                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                placeholder="Fecha nacimiento"
                                {...register("estu_fecha_nacimiento", {
                                    required: true,
                                    minLength: 3,
                                    pattern: /^\d{4}-\d{2}-\d{2}$/,
                                })}
                            />
                            {errors.estu_fecha_nacimiento?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.estu_fecha_nacimiento?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Ciudad nacimiento (*)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Ciudad nacimiento"
                                {...register("estu_ciudad", {
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,45}/,
                                })}
                            />
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.estu_ciudad?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.estu_ciudad?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                    </div>

                    <Divider />

                    <Text>Documento de identidad que anexa</Text>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-state"
                            >
                                Tipo Documento (*)
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 form-control"
                                    id="grid-state"
                                    defaultValue={""}
                                    required
                                    {...register("estu_tipo_documento")}
                                >
                                    <option disabled value={""}>
                                        Seleccione
                                    </option>
                                    <option value={"Registro civil"}>Registro civil</option>
                                    <option value={"Tarjeta identidad"}>Tarjeta identidad</option>
                                    <option value={"Cedula ciudadania"}>Cedula ciudadania</option>
                                    <option value={"N° Pasaporte"}>N° Pasaporte</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-city"
                            >
                                Numero Documento (*)
                            </label>
                            {/** VALIDACION DOCUMENTO DE IDENTIDAD */}
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-city"
                                type="text"
                                placeholder="Documento"
                                {...register("estu_documento", {
                                    required: true,
                                    pattern: /[0-9]{1,10}/,
                                })}
                            />
                            {errors.estu_documento?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}
                            {errors.estu_documento?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                Lugar Expedicion (*)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-first-name"
                                type="text"
                                placeholder="Lugar expedicion"
                                {...register("estu_lugar_expedicion", {
                                    required: false,
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,45}/,
                                })}
                            />{" "}
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.estu_lugar_expedicion?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.estu_lugar_expedicion?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.estu_lugar_expedicion?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                    </div>

                    <Divider />

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Sexo (*)
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    defaultValue={""}
                                    required
                                    {...register("sexo")}
                                >
                                    <option disabled value={""}>
                                        Seleccione
                                    </option>
                                    <option value={"M"}>M</option>
                                    <option value={"F"}>F</option>
                                </select>
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                Direccion Residencia (*)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-first-name"
                                type="text"
                                placeholder="Direccion residencia"
                                {...register("estu_direccion", {
                                    required: true,
                                    minLength: 4,
                                })}
                            />
                            {errors.estu_direccion?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}
                            {errors.estu_direccion?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">Minimo de caracteres incorrecto</small>
                            )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Ciudad Residencia (*)
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Ciudad"
                                {...register("estu_ciudad", {
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,45}/,
                                })}
                            />
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.estu_ciudad?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                            )}
                            {errors.estu_ciudad?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                    </div>

                    {/**FORM MATRICULA ------------------------------------------ */}
                    <Divider />
                    <Callout className="mt-6 h-12 mb-8" title="Datos matricula" icon={CheckCircleIcon} color="blue">
                    </Callout>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Curso
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                defaultValue={""}
                                required
                                {...register("curso")} >
                                <option disabled value={""}>Seleccione</option>
                                <option value={"PRE-JARDIN"}>      PRE-JARDIN </option>
                                <option value={"JARDIN"}>          JARDIN </option>
                                <option value={"PARVULOS"}>        PARVULOS </option>
                                <option value={"TRANSICION"}>      TRANSICION </option>
                                <option value={"PRIMERO"}>         PRIMERO    </option>
                                <option value={"SEGUNDO"}>         SEGUNDO    </option>
                                <option value={"TERCERO"}>         TERCERO    </option>
                                <option value={"CUARTO"}>          CUARTO     </option>
                                <option value={"QUINTO"}>          QUINTO     </option>
                                <option value={"SEXTO"}>           SEXTO      </option>
                                <option value={"SEPTIMO"}>         SEPTIMO    </option>
                                <option value={"OCTAVO"}>          OCTAVO     </option>
                                <option value={"NOVENO"}>          NOVENO     </option>
                                <option value={"DECIMO"}>          DECIMO     </option>
                                <option value={"ONCE"}>            ONCE       </option>
                            </select>


                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Grado
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-first-name"
                                type="text"
                                placeholder="Grado"
                                {...register("nivel", {
                                    required: true,
                                    pattern: /^[1-4]$/,
                                })} />
                            {errors.nivel?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.nivel?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Estado Matricula
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-state"
                                defaultValue={""}
                                required
                                {...register("estado")} >
                                <option disabled value={""}>Seleccione</option>
                                <option value={"ACTIVO"}>ACTIVO</option>
                                <option value={"INACTIVO"}>INACTIVO</option>
                            </select>
                        </div>
                    </div>

                    {/** FORM ACUDIENTES ------------------------------------------------------------------------- */}
                    {/* <Divider></Divider>
                    <Callout className="mt-6 h-12 mb-8" title="Datos Acudientes" icon={CheckCircleIcon} color="gray">
                        dcdf  
                    </Callout>
                    <Callout className="mt-4" title="Datos Acudientes" icon={CheckCircleIcon} color="gray">
                        All systems are currently within their default operating ranges.
                    </Callout>
                    <Divider />
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Nombres
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                placeholder="Nombres"
                                disabled
                                {...register("acud_nombres")}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Apellidos
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Apellidos"
                                disabled
                                {...register("acud_apellidos")}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Vive
                            </label>

                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    {...register("acud_vive")} />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Si</label>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Parentesco
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                defaultValue={""}
                                required
                                {...register("parentesco")} >
                                <option disabled value={""}>Seleccione</option>
                                <option value="mama">mama</option>
                                <option value="papa">papa</option>
                                <option value="abuelo (a)">abuelo (a)</option>
                                <option value="tio (a)">tio (a)</option>
                                <option value="primo (a)">primo (a)</option>
                                <option value="hermano (a)">hermano (a)</option>
                                <option value="otro">otro</option>
                            </select>
                        </div>
                    </div>

                    <Divider />

                    <Text>Datos de identificacion</Text>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Tipo Documento
                            </label>
                            <div className="relative">
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ciudad residencia"
                                    disabled
                                    {...register("acud_tipo_doc")} />
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Numero Documento
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="N° documento"
                                disabled
                                required
                                {...register("acu_documento")} />

                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Lugar expedicion
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Lugar expedicion"
                                disabled
                                {...register("acud_lugar_exp_doc")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Ocupacion
                            </label>
                            <div className="relative">

                                <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ocupacion"
                                    {...register("acud_ocupacion")}
                                    disabled
                                />

                            </div>
                        </div>
                    </div>
                    <Text>Datos de residencia</Text>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Direccion
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Direccion residencia"
                                disabled
                                {...register("direccion_residencia_acud")} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Ciudad
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ciudad residencia"
                                disabled
                                {...register("ciudad_residencia_acud")}
                            />
                        </div>
                    </div>
                    <Divider />
                    <Text>Datos de contacto</Text>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Celular
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="tel" placeholder="Celular"
                                disabled
                                {...register("celular")} />

                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Telefono
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="tel" placeholder="Telefono"
                                disabled
                                {...register("telefono")} />

                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Correo
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="email" placeholder="Correo"
                                disabled
                                {...register("acud_correo")}
                            />
                        </div>
                    </div> */}

                    <Divider />

                    <Flex justifyContent="end">
                        <button type="submit">
                            <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">


                                <Text color="indigo">
                                    <Bold>Actualizar</Bold>
                                </Text>
                                <Icon
                                    variant="solid"
                                    icon={ChevronDoubleRightIcon}
                                    size="xs"
                                    color="violet"
                                />
                            </div>
                        </button>
                    </Flex>
                </form>
            </Card>
        </div>
    )
}

export default EditMatricula;