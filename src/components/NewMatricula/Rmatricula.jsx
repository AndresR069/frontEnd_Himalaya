import React from "react";
import { useForm } from "react-hook-form";
import { Card, Metric, Text, Flex, Divider, Icon, Bold } from "@tremor/react";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';

const Rmatricula = () => {

    /**variables de captura */
    const navigate = useNavigate() //habilita la variable navegacion -->nos redigira una vez realizado la insercicon

    const { register, handleSubmit } = useForm();

    //procedimiento validar data y guardar
    const customSubmit = (data) => {
        // console.log(data);
        // alert("validacion exitosa");
        localStorage.setItem('form_matricula', JSON.stringify(data)); //form -->send -- localStorage

        navigate('/Rprocedencia') //navigate --> ruta para navegar una vez realizado el metodo de registro
    };
    return (
        <div className="grid h-screen place-items-center bg-slate-200">   {/** Centrar contenido del div --> CARD
         * grid h-screen el div ocupa todo el contenido de la pantalla para que no se desboraden los componentes 
         */}
            <Card className="max-w-2xl center" decoration="top" decorationColor="indigo">
                <Metric className="justify-center">Hoja de vida estudiante</Metric>
                <Text>Informacion academica del beneficiario - alumno o educando</Text>

                <Divider />

                <form className="w-full justify-center" onSubmit={handleSubmit(customSubmit)}>

                    <Text>Se matricula en jornada unica a nivel de:</Text>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Grado
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                defaultValue={""}
                                required
                                {...register("nivel")} >
                                <option disabled value={""}>Seleccione</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                            {/**  Comentario en la vista*/}

                        </div>
                    </div>

                    <Divider />

                    {/** Fin de Pagina */}

                    <Flex justifyContent="end">

                        <button type="submit">
                            <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse ...">
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
    )
}

export default Rmatricula;