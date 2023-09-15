import { Card, Metric, Text, Flex, Divider, Title, Icon, Bold } from "@tremor/react";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import React from "react";
import { useForm } from "react-hook-form";

const Rsalud = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate() //habilita la variable navegacion -->nos redigira una vez realizado la insercicon

    const customSubmit = (data) => {
        // console.log(data);
        // alert("validacion exitosa");
        localStorage.setItem('form_salud', JSON.stringify(data)); //form -->send -- localStorage
        // localStorage.removeItem('form_procedencia');
        navigate('/Racudiente');
    };

    return (
        <div className="grid h-screen place-items-center bg-slate-200">  { /** Centrar contenido del div --> CARD */}
            <Card className="max-w-2xl center" decoration="top" decorationColor="indigo">
                <Metric className="justify-center">Hoja de vida estudiante</Metric>
                <Text >Informacion de salud del beneficiario - alumno o educando</Text>

                <Divider />

                <form className="w-full justify-center" onSubmit={handleSubmit(customSubmit)}>

                    <Title>¿El estudiante padece alguna enfermedad?</Title>

                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    {...register("tiene_enfermedad")} />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Si</label>
                            </div>

                        </div>

                        <div className="w-full md:w-2/4 px-3 mb-6 md:mb-0">

                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Cual?"
                                {...register("descripcion_enfermedad", {
                                    pattern: /[A-Za-z]{4,45}/,
                                })} />
                            {errors.descripcion_enfermedad?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>

                    </div>
                    <Divider />
                    <Title>Vacunas aplicadas</Title>

                    <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            {...register("todas_vacunas")} />


                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Todas</label>
                    </div>
                    <Text>Vacuna covid</Text>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                            <div className="flex items-center mb-4">
                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    {...register("tiene_vacuna_covid")} />

                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Si</label>
                            </div>


                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Tipo vacuna covid
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                    defaultValue={""}
                                    required
                                    {...register("nom_vacu_covid")}>
                                    <option disabled value={""}>Seleccione</option>
                                    <option value="Sin registrar" >Sin registrar</option>
                                    <option value="PfizerBioNTech">PfizerBioNTech</option>
                                    <option value="Moderna">Moderna</option>
                                    <option value="AstraZeneca">AstraZeneca</option>
                                    <option value="Jhonson & Jhonson Janssen">Jhonson & Jhonson Janssen</option>
                                    <option value="Sinovac">Sinovac</option>
                                    <option value="Sinopharm">Sinopharm</option>
                                    <option value="Zydus">Zydus</option>
                                    <option value="Gamaleya">Gamaleya</option>
                                    <option value="CanSinoBIO">CanSinoBIO</option>
                                    <option value="Otra">Otra</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Observaciones
                            </label>
                            <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="Cual?"
                                {...register("observaciones_enfermedad", {
                                    pattern: /[A-Za-z]{4,45}/,
                                })} />
                            {errors.observaciones_enfermedad?.type === "pattern" && (
                                <small className="text-red-500 text-xs italic">Caracter invalido</small>
                            )}
                        </div>
                    </div>
                    <Divider/>
                    <Flex justifyContent="end">
                        <button type="submit">
                            <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">
                                {" "}
                                {/**items-center -- alinear contenido en X */}
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
}

export default Rsalud;