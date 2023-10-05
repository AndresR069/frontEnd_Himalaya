import { Card, Text, Flex, Divider, Icon, Bold, Callout, Grid, Button } from "@tremor/react";
import React, { useState } from 'react';
import {
    ExclamationTriangleIcon, DocumentPlusIcon, ArrowDownCircleIcon
} from '@heroicons/react/24/solid';
import GuardarMatriculaDB from "../GuardarMatriculaDB";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import { useForm } from "react-hook-form";

const URI = "http://localhost:8000/himalayaSchool/getAcud";

const SearchAcud = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [count, setCount] = useState(0); //contador acudientes
    const [acudientes, setAcudientes] = useState([]); //array acudientes


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

    //procedimiento despues de validar el formulario
    let identificacion = watch("identificacion"); //almacenando en tiempo real con "watch" lo digitado en el campo identificacion

    //funcion de busqueda en db acudiente por identificacion --cedula o pasaporte--
    //asigna los valores a los campos no editables
    async function SubmitBusqueda() {
        await axios.post(URI, {
            identificacion: identificacion,
        }).then(res => {
            const element = res.data; //almacena el array de la consulta temporalmente para poder validar
            //console.log(element.length);
            //valida que la consulta si retorne algo
            if (element.length > 0) {

                notificacion('Acudiente encontrado', 'succes'); // -- notifacion encontro acudiente

                //cargue de data a campos visuales (inputs no editables)
                for (let index = 0; index < element.length; index++) {
                    const _element = element[index];
                    let llaves = Object.keys(_element)
                    let valores = Object.values(_element)
                    for (let _index = 0; _index < llaves.length; _index++) {
                        // console.log(`${llaves[_index]} - ${valores[_index]}`);
                        setValue(llaves[_index], valores[_index])
                    }
                }
            } else {
                notificacion('Acudiente no encontrado', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
                //limpieza de campos en caso de no encotrar nada*************
                setValue("acud_nombres", "");
                setValue("acud_apellidos", "");
                setValue("acud_tipo_doc", "");
                setValue("acu_documento", "");
                setValue("acud_lugar_exp_doc", "");
                setValue("acud_ocupacion", "");
                setValue("direccion_residencia_acud", "");
                setValue("ciudad_residencia_acud", "");
                setValue("ocupacion_acud", "");
                setValue("direccion_residencia_acud", "");
                setValue("ciudad_residencia_acud", "");
                setValue("celular", "");
                setValue("telefono", "");
                setValue("acud_correo", "");

            }
        }).catch(error => {
            notificacion('Error en la busqueda', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
            console.log(error);
        })
    }

    //almacena el acudiente del formulario en variables temp --> luego de registrar parentesco y checkbox vive 
    //procedimiento validar data y almacenar en variables temporales
    const customSubmit = (data) => {

        console.log(data);

        const temp = count + 1;
        const acudiente = Object.assign(data, { "contador": temp })//asignacion del contador al objeto acudiente que asigna su posicion en la consulta en db

        setCount(count + 1); //aumentar el contador
        if (temp > 0 && temp <= 3) {
            setAcudientes(arr => [...arr, acudiente]); //agregar objeto data:acudiente a variable acudiente array
            notificacion('Acudiente registrado', 'succes');
        } else if (temp > 3) {
            notificacion('Maximo acudientes alcanzado', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
        }

        //una vez validado el form vacia los campos del mismo para un nuevo registro


        setValue("identificacion", ""); //campo de busqueda acudiente

        setValue("acud_nombres", "");
        setValue("acud_apellidos", "");
        setValue("acud_tipo_doc", "");
        setValue("acu_documento", "");
        setValue("acud_lugar_exp_doc", "");
        setValue("acud_ocupacion", "");
        setValue("direccion_residencia_acud", "");
        setValue("ciudad_residencia_acud", "");
        setValue("ocupacion_acud", "");
        setValue("direccion_residencia_acud", "");
        setValue("ciudad_residencia_acud", "");
        setValue("celular", "");
        setValue("telefono", "");
        setValue("acud_correo", "");

    };
    return (
        <Card className="max-w-full">
            <Callout
                title="Tener en cuenta que esta accion solo se realiza para Padres con mas de un hijo a los cuales se les realizo ya un registro en el sistema"
                icon={ExclamationTriangleIcon}
                color="blue"
                className="mt-6"

            />
            <Card>

                <form className="w-full justify-center" onSubmit={handleSubmit(SubmitBusqueda)}>
                    {/**GRID ajusta input y boton de busqueda al cambio de tamaño de pantalla */}
                    <Grid numItems={1} numItemsSm={1} numItemsMd={2} numItemsLg={2} className="mt-6 gap-x-2 gap-y-2">

                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="N° documento"
                            min={100000}
                            max={3999999999}
                            required
                            {...register("identificacion", {
                                maxLength: 10,
                                pattern: /[0-9]{1,10}/,
                            })} />
                        {errors.identificacion?.type === "maxLength" && (
                            <small className="text-red-500 text-xs italic">El maximo de digitos son 10</small>
                        )}
                        {errors.identificacion?.type === "pattern" && (
                            <small className="text-red-500 text-xs italic">Identificacion invalida</small>
                        )}
                        <Button
                            size="lg"
                            icon={ArrowDownCircleIcon}
                            variant="secondary"
                            type='submit'
                            onSubmit={SubmitBusqueda} >Buscar</Button >
                    </Grid>

                </form>
                <ToastContainer />

                <Divider />
                {/**FORMULARIO QUE SERA LLENADO SOLO SI ENCUENTRA DATA */}
                <form onSubmit={handleSubmit(customSubmit)}>
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
                </form>
            </Card>
            {/** Fin de Pagina */}
            <Divider />
            <Flex justifyContent="end">
                {/**COMPONENTE BOTON DE GUARDAR */}
                <GuardarMatriculaDB acudientes={JSON.stringify(acudientes)} tipoAsignacion={2} ></GuardarMatriculaDB>
            </Flex>

        </Card >
    );
}

export default SearchAcud;
