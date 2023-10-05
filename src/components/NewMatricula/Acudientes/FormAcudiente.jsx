import { Card, Text, Flex, Divider, Icon, Bold } from "@tremor/react";
import { DocumentPlusIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import GuardarMatriculaDB from "../GuardarMatriculaDB";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones

const FormAcudiente = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [_hidden, setHidden] = useState(false);
    const [_required, setRequired] = useState(false);
    const [acudientes, setAcudientes] = useState([]); //array acudientes
    const [count, setCount] = useState(0); //contador acudientes
    //notifaciones ...........documentacion -- react-tostify..............
    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    const customIdSucces = "custom-id-error";//Id toast error 

    function notificacion(text, type) {

        if (type === 'error') {
            toast.error(text, { autoClose: 3000, toastId: customIdErr, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'succes') {
            toast.success(text, { autoClose: 3000, toastId: customIdSucces, position: toast.POSITION.BOTTOM_RIGHT })
        }
    }
    //procedimiento validar data y almacenar en variables temporales
    const customSubmit = (data) => {
        const temp = count + 1;
        const acudiente = Object.assign(data, { "contador": temp })//asignacion del contador al objeto acudiente que asigna su posicion en la consulta en db
        console.log(acudiente);
        setCount(count + 1); //aumentar el contador
        if (temp > 0 && temp <= 3) {
            setAcudientes(arr => [...arr, acudiente]); //agregar objeto data:acudiente a variable acudiente array
            notificacion('Acudiente registrado', 'succes');
        } else if (temp > 3) {
            notificacion('Maximo acudientes alcanzado', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
        }

        //una vez validado el form vacia los campos del mismo para un nuevo registro
        setValue("nombres_acud", "");
        setValue("apellidos_acud", "");
        setValue("acud_vive", false);
        setValue("parentesco", "");
        setValue("tipo_doc_acud", "");
        setValue("id_acudiente", "");

        setValue("N° pasaporte", "");
        setValue("lugar_expedicion_acud", "");
        setValue("ocupacion_acud", "");

        setValue("direccion_residencia_acud", "");
        setValue("ciudad_residencia_acud", "");
        setValue("celular_acud", "");

        setValue("telefono_acud", "");
        setValue("correo_acud", "");
    };
    let ident_acud = watch("tipo_doc_acud"); //almacenando en tiempo real con "watch" lo digitado en el campo prueba
    useEffect(() => {
        if (ident_acud === "tarjeta pasaporte o carnet de identidad (CI)") {
            setValue("pasaporte_acud", "");
            setValue("id_acudiente", "");
            setHidden(true);
            setRequired(true);
        } else {
            setValue("pasaporte_acud", "");
            setValue("id_acudiente", "");
            setHidden(false);
            setRequired(false);
        }
    }, [ident_acud, setValue]); //aregar identificacion para que renderize a nivel de componente y no presentar problemas en useEffect

    return (
        <Card className="max-w-3xl" decoration="bottom" decorationColor="indigo" justify-content="center" >
            {/** Formulario */}
            <form className="w-full justify-center" onSubmit={handleSubmit(customSubmit)}>
                {/**  Nombres + fecha nacimiento seccion form */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Nombres
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="text"
                            placeholder="Nombres"
                            {...register("nombres_acud", {
                                pattern: /[A-Za-z]{3,45}/,
                                required: true,
                                minLength: 3,
                            })}
                        />
                        {errors.nombres_acud?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{" "}
                        {/* errors.name?.type ==== 'required' --> encadenamiento opcional */}
                        {errors.nombres_acud?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                        )}
                        {errors.nombres_acud?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Apellidos
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Apellidos"
                            {...register("apellidos_acud", {
                                pattern: /[A-Za-z]{3,45}/,
                                required: true,
                                minLength: 3,
                            })}
                        />
                        {errors.apellidos_acud?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{" "}
                        {/* errors.name?.type ==== 'required' --> encadenamiento opcional */}
                        {errors.apellidos_acud?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                        )}
                        {errors.apellidos_acud?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}

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
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 form-control" id="grid-state"
                                defaultValue={""}
                                required
                                {...register("tipo_doc_acud")}
                            >
                                <option disabled value={""}>Seleccione</option>
                                <option value="cedula ciudadania CC">cedula de ciudadania CC</option>
                                <option value="documento nacional de identidad (DNI)">documento nacional de identidad DNI</option>
                                <option value="tarjeta pasaporte o carnet de identidad (CI)">tarjeta pasaporte o carnet de identidad CI</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Numero Documento
                        </label>
                        <input className={_hidden ? 'invisible' : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"} id="grid-city" type="number" placeholder="N° documento"
                            min={100000}
                            max={2999999999}
                            hidden={_hidden}
                            required={!_required}
                            {...register("id_acudiente", {
                                maxLength: 10,
                                pattern: /[0-9]{1,10}/,
                            })} />
                        {errors.id_acudiente?.type === "maxLength" && (
                            <small className="text-red-500 text-xs italic">El maximo de digitos son 10</small>
                        )}
                        {errors.id_acudiente?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Identificacion invalida</small>
                        )}
                        {/** VALIDACION N° PASAPORTE */}
                        <input
                            className={_hidden ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-0" : 'invisible'}
                            id="grid-city"
                            type="text"
                            placeholder="N° pasaporte"
                            hidden={!_hidden}
                            required={_required}
                            {...register("pasaporte_acud", {
                                pattern: /^[a-z]{3}[0-9]{6}[a-z]?$/i,
                            })}
                        />
                        {errors.pasaporte_acud?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Identificacion invalida</small>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Lugar expedicion
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Lugar expedicion"
                            {...register("lugar_expedicion_acud", {
                                pattern: /[A-Za-z]{3,45}/,
                                required: true,
                                minLength: 3,
                            })}
                        />
                        {errors.lugar_expedicion_acud?.type === "required" && (
                            <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                        )}{" "}
                        {/* errors.name?.type ==== 'required' --> encadenamiento opcional */}
                        {errors.lugar_expedicion_acud?.type === "minLength" && (
                            <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                        )}
                        {errors.lugar_expedicion_acud?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Caracter invalido</small>
                        )}

                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Ocupacion
                        </label>
                        <div className="relative">

                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ocupacion"
                                {...register("ocupacion_acud", {
                                    pattern: /[A-Za-z]{3,45}/,
                                    minLength: 3,
                                })}
                            />
                            {errors.ocupacion_acud?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.ocupacion_acud?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
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
                            {...register("direccion_residencia_acud")} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Ciudad
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Ciudad residencia"
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
                            {...register("celular_acud", {
                                maxLength: 10,
                                pattern: /[0-9]{8,10}/,
                            })} />
                        {errors.celular_acud?.type === "maxLength" && (
                            <small className="text-red-500 text-xs italic">El maximo de digitos son 10</small>
                        )}
                        {errors.celular_acud?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Numero invalido</small>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Telefono
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="tel" placeholder="Telefono"
                            {...register("telefono_acud", {
                                maxLength: 10,
                                pattern: /[0-9]{8,10}/,
                            })} />
                        {errors.telefono_acud?.type === "maxLength" && (
                            <small className="text-red-500 text-xs italic">El maximo de digitos son 10</small>
                        )}
                        {errors.telefono_acud?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Numero invalido</small>
                        )}


                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Correo
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="email" placeholder="Correo"
                            {...register("correo_acud", {
                                minLength: 5,
                                pattern: /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i,
                            })}
                        />
                    </div>
                </div>
                <Divider />
                <button type="submit">
                    <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">
                        {" "}
                        {/**items-center -- alinear contenido en X */}
                        <Text color="slate">
                            <Bold>Agregar acudiente</Bold>
                        </Text>
                        <Icon
                            variant="solid"
                            icon={DocumentPlusIcon}
                            size="xs"
                            color="slate"
                        />
                    </div>
                </button>
                <ToastContainer /> {/** Necesario para que la notifacion se muestre --------------------- */}
            </form>
            {/** Fin de Pagina */}
            <Divider />
            <Flex justifyContent="end">
                {/**COMPONENTE BOTON DE GUARDAR */}
                <GuardarMatriculaDB acudientes={JSON.stringify(acudientes)} tipoAsignacion={1} ></GuardarMatriculaDB>
            </Flex>
        </Card>

    );
}

export default FormAcudiente;