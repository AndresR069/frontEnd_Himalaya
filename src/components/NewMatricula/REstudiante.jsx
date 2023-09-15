import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, Metric, Text, Flex, Divider, Bold, Icon } from "@tremor/react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const REstudiante = () => {
    const navigate = useNavigate(); //habilita la variable navegacion -->nos redigira una vez realizado la insercicon

    const [_hidden, setHidden] = useState(false);
    const [_required, setRequired] = useState(false);
    //React hook form -- seccion validaciones
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm();
    //procedimiento validar data y guardar
    const customSubmit = (data) => {
        // console.log(data);
        //alert("validacion exitosa");
        localStorage.setItem('form_data_estudent', JSON.stringify(data)); //form -->send -- localStorage
        // localStorage.removeItem('dataKey');
        navigate('/Rmatricula') //navigate --> ruta para navegar una vez realizado el metodo de registro
    };

    let identificacion = watch("tipo_doc"); //almacenando en tiempo real con "watch" lo digitado en el campo prueba

    useEffect(() => {
        //ejecutar el evento segun el ciclo de vida del componente " useEffect"
        if (identificacion === "N° Pasaporte") {
            // console.log("entro pasaporte");
            setValue("pasaporte_estudiante", "");
            setValue("cedula_estudiante", "");
            setHidden(true);
            setRequired(true);
        } else {
            // console.log("entro otro");
            setValue("pasaporte_estudiante", "");
            setValue("cedula_estudiante", "");
            setHidden(false);
            setRequired(false);
        }
    }, [identificacion, setValue]); //aregar identificacion para que renderize a nivel de componente y no presentar problemas en useEffect

    return (
        <div className="grid min-h-screen max-h-max place-items-center bg-slate-200">
            {/** Centrar contenido del div --> CARD */}
            <Card
                className="max-w-3xl center"
                decoration="top"
                decorationColor="indigo"
            >
                <Metric className="justify-center">Hoja de vida estudiante</Metric>
                <Text>Informacion personal del beneficiario</Text>

                <Divider />

                <form
                    className="w-full justify-center"
                    onSubmit={handleSubmit(customSubmit)}
                >
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
                                {...register("nombres", {
                                    pattern: /[A-Za-z]{3,45}/,
                                    required: true,
                                    minLength: 3,
                                })}
                            />
                            {errors.nombres?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.nombres?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.nombres?.type === "pattern" && (
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
                                {...register("apellidos", {
                                    required: true,
                                    minLength: 3,
                                    pattern: /[A-Za-z]{3,45}/,
                                })}
                            />{" "}
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.apellidos?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.apellidos?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.apellidos?.type === "pattern" && (
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
                                type="date"
                                min="2000-01-01"
                                max="2020-12-31"
                                required
                                {...register("fecha_nacimiento")}
                            />
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
                                {...register("lugar_nacimiento", {
                                    required: true,
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,45}/,
                                })}
                            />{" "}
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.lugar_nacimiento?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.lugar_nacimiento?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.lugar_nacimiento?.type === "pattern" && (
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
                                    {...register("tipo_doc")}
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
                                className={_hidden ? 'invisible' : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
                                id="grid-city"
                                type="number"
                                placeholder="N° documento"
                                hidden={_hidden}
                                min={100000000}
                                max={2999999999}
                                required={!_required}
                                {...register("cedula_estudiante", {
                                    maxLength: 10,
                                    pattern: /[0-9]{1,10}/,
                                })}
                            />
                            <label htmlFor="" hidden>fffffffff</label>
                            {errors.cedula_estudiante?.type === "maxLength" && (
                                <small className="text-red-500 text-xs italic">El maximo de digitos son 10</small>
                            )}
                            {errors.cedula_estudiante?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Identificacion invalida</small>
                            )}
                            {/** VALIDACION N° PASAPORTE */}
                            <input
                                className={_hidden ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" : 'invisible'}
                                id="grid-city"
                                type="text"
                                placeholder="N° pasaporte"
                                hidden={!_hidden}
                                required={_required}
                                {...register("pasaporte_estudiante", {
                                    pattern: /^[a-z]{3}[0-9]{6}[a-z]?$/i,
                                })}
                            />
                            {errors.pasaporte_estudiante?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Identificacion invalida</small>
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
                                {...register("lugar_exp_doc", {
                                    required: true,
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,45}/,
                                })}
                            />{" "}
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.lugar_exp_doc?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.lugar_exp_doc?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.lugar_exp_doc?.type === "pattern" && (
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
                                    {...register("genero")}
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
                                {...register("direccion_residencia", {
                                    required: true,
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,666}/,
                                })}
                            />
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.direccion_residencia?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.direccion_residencia?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 3</small>
                            )}
                            {errors.direccion_residencia?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
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
                                {...register("ciudad_residencia", {
                                    required: true,
                                    minLength: 4,
                                    pattern: /[A-Za-z]{4,45}/,
                                })}
                            />{" "}
                            {/** --> /[A-Za-z]{3,45}/ -- zexpresion regular validar caracteres ingresados */}
                            {errors.ciudad_residencia?.type === "required" && (
                                <small className="text-red-500 text-xs italic">El campo no puede estar vacío</small>
                            )}{" "}
                            {/* errors.name?.type === 'required' --> encadenamiento opcional */}
                            {errors.ciudad_residencia?.type === "minLength" && (
                                <small className="text-red-500 text-xs italic">El minimo de caracteres es 4</small>
                            )}
                            {errors.ciudad_residencia?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                    </div>

                    <Flex justifyContent="end">
                        <button type="submit">
                            <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">


                                <Text color="indigo">
                                    <Bold>Continuar</Bold>
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
    );
};

export default REstudiante;
