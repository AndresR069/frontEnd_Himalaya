import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Flex } from "@tremor/react";
const Pdf = () => {
    const conponentPDF = useRef();

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdata"
    });

    useEffect(() => {
        generatePDF();
    }, [])
    return (
        <div ref={conponentPDF} style={{ width: '100%' }} className="w-3/4 bg-white">   {/** Centrar contenido del div --> CARD**/}
            <Flex justifyContent="start" alignItems="start" className='mt-10 space-x-10'>
                <div className="w-40">
                    <img className="object-top object-scale-down h-24 w-96" src="escudo.jpg" alt="Imagen del colegio" />
                </div>
                <div className="text-center w-6/12 h-1">
                    <h1 className="text-blue-500 text-3xl font-semibold">COLEGIO HIMALAYA</h1>
                    <h2 className="text-blue-500 text-2xl">HIMALAYA SCHOOL</h2>
                    <h3 className="text-blue-500 text-1xl font-normal">FUSAGASUGA - CUNDINAMARCA</h3>
                </div>
            </Flex>
            <div className="w-full flex justify-center">
                <h3 className="text-1xl font-thin mr-4">LICENCIA DE INICIACION DE LABORES N° 001858 DEL 15 DE DICIEMBRE DE 1993.</h3>
            </div>
            <div className="w-full flex justify-center">
                <div >
                <h3 className="text-1xl font-extralight mr-4">LICENCIA DE FUNCIONAMIENTO PARA LA PRESTACIÓN DEL SERVICIO EDUCATIVO FORMAL DE NATURALEZA PRIVADA N° 002040 DEL 01 DE AGOSTO DE 2002.</h3>
                </div>
            </div>
        </div>
    )
}

export default Pdf;