import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Card, Metric, Text, Flex, Divider, Icon, Bold, Grid, Button, Callout, Subtitle, Title } from "@tremor/react";
import { ChevronDoubleRightIcon, ArrowDownCircleIcon, CheckIcon, BellAlertIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import axios from "axios";
const URI = "http://localhost:8000/himalayaSchool/estuCedula";
const URIMATRICULAR = "http://localhost:8000/himalayaSchool/oldMatricula";

const Oldmatricula = () => {
    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    const customIdSucces = "custom-id-succes";//Id toast error 
    const customIdInfo = "custom-id-info";
    const [_hidden, setHidden] = useState(false); //Para modificar la propiedad hidden (Ocultar)

    const ocultElements = (estado) => {
        setHidden(estado);
    };

    /**variables de captura */
    const navigate = useNavigate() //habilita la variable navegacion -->nos redigira una vez realizado la insercicon

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

    //procedimiento validar data y guardar
    const customSubmit = (data) => {
        if (data.curso != '') {
            matricular(data.id_estudiante, data.nivel_matricula, data.curso_matricula, data.estado_matricula);
        }
    };

    let identificacion = watch("identificacion"); //almacenando en tiempo real con "watch" lo digitado en el campo identificacion

    let estadoMatricula = watch("estado_matricula");

    useEffect(() => { //ejecute funcion una sola vez -- apenas se renderice el componente
        if (estadoMatricula == 'APROBADO') {
            // console.log('aprobado');
            ocultElements(true);
        }
        if (estadoMatricula == 'REPROBADO') {
            // console.log('perdio');
            ocultElements(false);
        }
    }, [estadoMatricula]) //funcion captura y envio para la consulta de estudiantes al back


    //Limpiar campos
    const clear = () => {
        setValue("nombres", "");
        setValue("apellidos", "");
        setValue("curso", "");
        setValue("nivel", "");
        setValue("estado_matricula", "");
    };

    //BUSQUEDA DATA ESTUDIANTE****************************
    const SubmitBusqueda = async () => {
        try {
            const estuCedula = await axios.post(URI, { identificacion })

            if (estuCedula.status == '200') {
                if (estuCedula.data[0].id_estudiante != null) {
                    const element = estuCedula.data;
                    notificacion('Estudiante encontrado', 'succes'); // -- notifacion encontro acudiente
                    for (let index = 0; index < element.length; index++) {
                        const _element = element[index];
                        let llaves = Object.keys(_element)
                        let valores = Object.values(_element)
                        for (let _index = 0; _index < llaves.length; _index++) {
                            setValue(llaves[_index], valores[_index])
                        }
                    }
                } else {
                    notificacion('Estudiante no encontrado', 'error')
                    clear();
                }
            } else {
                notificacion('Estudiante no encontrado', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
                //limpieza de campos en caso de no encotrar nada*************
                clear();
            }
        } catch (error) {
            console.log(error);
            notificacion('Error en la busqueda', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
            clear();
        }


    }

    //APROBAR O REPROBAR ESTUDIANTE****************************
    const matricular = async (id_estudiante, nivel, curso, estado_matricula) => {
        try {
            const matricular = await axios.post(URIMATRICULAR, {
                id_estudiante,
                nivel,
                curso,
                estado_matricula
            })
            if (matricular.status == '200') {
                notificacion('Matricula exitosa', 'succes'); // -- notifacion encontro acudiente
                navigate('/dashboard') 
            } else {
                notificacion('Estudiante no matriculado', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
                //limpieza de campos en caso de no encotrar nada*************
                clear();
            }
        } catch (error) {
            console.log(error);
            notificacion('Error en la matricula', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
            clear();
        }
    }
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
        <div className="grid h-screen place-items-center bg-slate-200">   {/** Centrar contenido del div --> CARD
         * grid h-screen el div ocupa todo el contenido de la pantalla para que no se desboraden los componentes 
         */}
            <Card className="max-w-2xl center" decoration="top" decorationColor="indigo">
                <Metric className="justify-center">Hoja de vida estudiante</Metric>
                <Text>Informacion academica del beneficiario - alumno o educando</Text>

                <Divider />

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

                <Callout
                    title="Datos del estudiante a matricular"
                    icon={CheckIcon}
                    color="teal"
                    className='mt-4 h-12'>
                </Callout>

                <div className="mt-5">
                    {/**FORMULARIO QUE SERA LLENADO SOLO SI ENCUENTRA DATA */}

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
                                {...register("nombres")}
                            />
                            <input
                                type="text"
                                disabled
                                hidden
                                {...register("id_estudiante")}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Apellidos
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Apellidos"
                                disabled
                                {...register("apellidos")}
                            />
                        </div>
                    </div>

                    <Divider />

                    <Text>Matricula actual</Text>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Curso
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text"
                                placeholder="Curso"
                                disabled
                                {...register("curso")}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Nivel
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Nivel"
                                disabled
                                {...register("nivel")}
                            />
                        </div>
                    </div>
                </div>

                <Callout
                    title="Generar matricula"
                    icon={BellAlertIcon}
                    color="blue"
                    className='mt-6 h-12'>
                </Callout>
                <div className="mt-5">
                    <form className="w-full justify-center" onSubmit={handleSubmit(customSubmit)}>


                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Seleccione el estado
                                </label>
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    defaultValue={""}
                                    required
                                    {...register("estado_matricula")} >
                                    <option disabled value={""}>Seleccione</option>
                                    <option value={"APROBADO"}>APROBADO</option>
                                    <option value={"REPROBADO"}>REPROBADO</option>
                                </select>
                            </div>
                        </div>

                        <div className={!_hidden ? 'hidden' : ''}>
                            <Text>Se matricula en jornada unica a nivel de:</Text>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Curso
                                    </label>
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-state"
                                        defaultValue={""}
                                        required={_hidden}
                                        {...register("curso_matricula")} >
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
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                        Grado
                                    </label>
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                        defaultValue={""}
                                        required={_hidden}
                                        {...register("nivel_matricula")} >
                                        <option disabled value={""}>Seleccione</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {/**  Comentario en la vista*/}

                                </div>
                            </div>
                        </div>
                        <Divider />

                        {/** Fin de Pagina */}

                        <Flex justifyContent="end">

                            <button type="submit">
                                <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">
                                    {/**items-center -- alinear contenido en X */}
                                    <Text color="indigo">
                                        <Bold>Matricular</Bold>
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
                </div>
            </Card>
        </div>
    )
}

export default Oldmatricula;