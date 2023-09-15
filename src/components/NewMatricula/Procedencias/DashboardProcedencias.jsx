import { Card, Metric, Text, Flex, Divider, Icon, Bold, Callout, TabGroup, Tab, TabList } from "@tremor/react";
import { DeviceTabletIcon, IdentificationIcon, CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import FormProcedencia from './FormProcedencia';
import TableProcedencias from "./TableProcedencias";
const DashboardProcedencia = () => {
    const [selectedView, setSelectedView] = useState(1) //variable selecciona vista
    //array barra navegacion
    const barraNavegacion = [
        { name: 'Formulario', icon: DeviceTabletIcon },
        { name: 'Registro Procedencias', icon: IdentificationIcon },
    ];
    return (

        <div className="grid min-h-screen max-h-max place-items-center bg-slate-200">   {/** Centrar contenido del div --> CARD**/}
            {/* min-h-screen --> como minimo se ajuste a toda la pantalla
                max-h-full --> como maximo se ajuste al contenido si es mas grande que la pantalla
            */}
            <Card className="max-w-3xl center" decoration="top" decorationColor="indigo">
                {/**cabecero */}
                <Metric className="justify-center">Hoja de vida estudiante</Metric>
                <Text>Informacion academica del beneficiario - alumno o educando</Text>

                <Divider />
                {/* <Callout
                    title="Formulario Procedencia Estudiantil"
                    text="Ingrese los colegios cursados anteriormente"
                    icon={CheckIcon}
                    height="h-12"
                    color="teal"
                    marginTop="mt-4"
                /> */}
                <Callout
                    title="Ingrese los colegios cursados anteriormente"
                    icon={CheckIcon}
                    color="teal"
                    className='mt-4 h-12'>
                </Callout>
                {/**barra de navegacion */}
                <TabGroup index={selectedView} onIndexChange={setSelectedView} className="mt-6">
                    <TabList>

                        {/* carga barra de navegacion con data Array */}
                        {barraNavegacion.map((element, index) => (

                            <Tab
                                key={index}
                                value={index + 1}
                                icon={element.icon}
                            >{element.name}</Tab>
                        ))}
                    </TabList>
                </TabGroup>
                {selectedView === 1 ? (
                    <>
                        <div className='mt-6'>

                            <TableProcedencias/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='mt-6'>
                            {/* <Procedencias /> */}
                            <FormProcedencia />
                        </div>

                    </>
                )
                }

                <Flex justifyContent="end">

                    <Link to='/Rsalud'> {/** Link redirijira a la ruta especificada */}
                        <div className="mt-4 flex items-center flex-row-reverse space-x-4 space-x-reverse ...">
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
                    </Link>
                </Flex>
            </Card>
        </div>
    )
}
export default DashboardProcedencia
