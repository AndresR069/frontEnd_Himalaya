import { TabGroup, Tab, TabList, Card, Flex, Button } from "@tremor/react";
import React, { useState } from 'react'
import { ClipboardDocumentListIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import TableEstudent from "./TableEstudent";
import { useNavigate } from "react-router-dom";
const DashboardBase = () => {
    const [selectedView, setSelectedView] = useState(0);
    const navigate = useNavigate(); //habilita la variable navegacion
    //Cerrar sesion -----------------------------
    const logout = () => {
        localStorage.removeItem("jwt")
        navigate("/")
    }
    return (

        <main className='flex items-center justify-center p-6 sm:p-10 min-h-screen max-h-full min-w-min max-w-screen bg-slate-200'>
            {/* min-h-screen --> como minimo se ajuste a toda la pantalla
                max-h-full --> como maximo se ajuste al contenido si es mas grande que la pantalla
                bg-slate-200 color del contenedor
            */}

            <Card className="max-w-screen-2xl">


                <Flex justifyContent="between" className='space-x-10 mt-6'>
                    <TabGroup index={selectedView} onIndexChange={setSelectedView} className="mt-6">
                        <TabList>

                            <Tab value={1} icon={ClipboardDocumentListIcon} >
                                Listado de Estudiantes
                            </Tab>
                            <Tab value={2}>
                                Consultas
                            </Tab>
                        </TabList>
                    </TabGroup>
                    <Button size="xl" variant="light" icon={ArrowLeftOnRectangleIcon} color='red' onClick={logout}>Cerrar Sesion</Button>
                </Flex>
                {selectedView === 1 ? (
                    <>
                        <div className="mt-6">

                            {/* Prototipo*/}
                            <h1>Hola</h1>

                        </div>
                    </>
                ) : (
                    <>
                        <div className="mt-6">
                            {/* Tabla  Listado de estudiantes matriculados*/}
                            <TableEstudent />
                        </div>
                    </>
                )
                }
            </Card>
        </main>
    )
}

export default DashboardBase