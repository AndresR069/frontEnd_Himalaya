// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Flex, Grid, Col, Card } from "@tremor/react";
const date = new Date();
const year = date.getFullYear(); //para traer el año 
console.log(`Año actual: ${year}`);




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

            {/* info licencias */}
                <div className="w-4/4 bg-white mx-auto p-1">
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>LICENCIA DE INICIACION DE LABORES N° 001858 DEL 15 DE DICIEMBRE DE 1993.</h3>
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>LICENCIA DE FUNCIONAMIENTO PARA LA PRESTACIÓN DEL SERVICIO EDUCATIVO FORMAL DE NATURALEZA PRIVADA N° 002040 DEL 01 DE AGOSTO DE 2002.</h3>
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>LICENCIA DE FUNCIONAMIENTO Y APROBACIÓN DE ESTUDIOS PARA PREESCOLAR, BÁSICA SECUNDARIA Y MEDIA VOCACIONAL No #16.</h3>
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>DEL 01 DE DICIEMBRE DEL 2005 Y RESOLUCIÓN DE AUTORIZACIÓN DE CAMBIO DE SEDE Y RAZÓN SOCIAL No. 924 DEL 03 DE MARZO DEL 2018</h3>
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>DE LA SECRETARIA DE EDUCACIÓN DE FUSAGASUGÁ DE NATRUALEZA PRIVADA, CALENDARIO A, CARACTER MIXTO, JORNADA UNICA</h3>
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>CODIGO DANE No 325290001851. CODIGO ICFES 13</h3>
                    <h3 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '15px' }}>PRE-ESCOLAR * BÁSICA PRIMARIA * BÁSICA SECUNDARIA * MEDIA VOCACIONAL</h3>
                    <h3 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '15px' }}>BACHILLERATOR ACADÉMICO CON ENFASIS EN IDIOMAS Y CIENCIAS</h3>
                    <h3 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '24px' }}>FORMULARIO DE PRE-MATRICULA-AÑO ACADEMICO {year}</h3>

                </div>

            <hr/>

            {/* Información del estudiante */}
            <h2 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '24px' }} >1. Información Básica del Estudiante</h2>

            <hr/>
            {/*  */}


            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                    <table className="table-auto">
                    <tbody>
                    <tr>
                        <td className="font-bold">Apellidos:</td>
                        {/* <td>{estudiante.apellidos}</td> */}
                        <td className="font-bold">Nombres:</td>
                        {/* <td>{estudiante.nombres}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Lugar y Fecha de Nacimiento:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Edad:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Documento de Identidad:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Grado al que Aspira:</td>
                        {/* <td colSpan="3">{estudiante.gradoAspira}</td> */}
                    </tr>
                    {/* Agrega más filas y columnas para otros campos de información básica */}
                    </tbody>
                </table>
                    </Card>
                </Col>
            </Grid>         

            {/*  */}

            {/* Estudios Aprobados  */}

            <hr/>

            {/* Información del estudiante */}
            <h2 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '24px' }} >2. Estudios aprobados Colegios y Años</h2>

            <hr/>

            <div>
                <table className="table-auto">
                    <tbody>
                    <tr>
                        <th className="border px-4 py-2">Pre-escolar</th>
                        <th className="border px-4 py-2">Colegio/Año</th>
                        <th className="border px-4 py-2">Basica Secundaria</th>
                        <th className="border px-4 py-2">Colegio/Año</th>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">PRE-JARDIN</td>
                        {/* <td className="border px-4 py-2">{estudiante.nombre}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">JARDIN</td>
                        {/* <td className="border px-4 py-2">{estudiante.apellido}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">TRANSICIÓN</td>
                        {/* <td className="border px-4 py-2">{estudiante.nombre}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">BASICA PRIMARIA</td>
                        {/* <td className="border px-4 py-2">{estudiante.apellido}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">PRIMERO</td>
                        {/* <td className="border px-4 py-2">{estudiante.nombre}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">SEGUNDO</td>
                        {/* <td className="border px-4 py-2">{estudiante.apellido}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">TERCERO</td>
                        {/* <td className="border px-4 py-2">{estudiante.apellido}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">CUARTO</td>
                        {/* <td className="border px-4 py-2">{estudiante.apellido}</td> */}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">QUINTO</td>
                        {/* <td className="border px-4 py-2">{estudiante.apellido}</td> */}
                    </tr>
                    {/* Agrega más filas para otros campos de información básica */}
                    </tbody>
                </table>
            </div>

            {/* 3- DATOS FAMILIARES */}


            <hr/>

            {/* Datos Familiares */}
            <h2 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '24px' }} >3. Datos Familiares</h2>

            <hr/>

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                    <table className="table-auto">
                    <tbody>
                    <tr>
                        <td className="font-bold">Nombre del padre:</td>
                        {/* <td>{estudiante.apellidos}</td> */}
                        <td className="font-bold">Profesion:</td>
                        {/* <td>{estudiante.nombres}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Residencia:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Telefono:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Empresa</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Dirección de la empresa:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Telefono:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">C.C No:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Expedida en:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                        <td className="font-bold">E-Mail:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>

                    <tr>
                        <td className="font-bold">Nombre del Madre:</td>
                        {/* <td>{estudiante.apellidos}</td> */}
                        <td className="font-bold">Profesion:</td>
                        {/* <td>{estudiante.nombres}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Residencia:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Telefono:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Empresa</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Dirección de la empresa:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Telefono:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">C.C No:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Expedida en:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                        <td className="font-bold">E-Mail:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>
                    
                    <tr>
                        <td className="font-bold">Acudiente:</td>
                        {/* <td>{estudiante.apellidos}</td> */}
                        <td className="font-bold">Profesion:</td>
                        {/* <td>{estudiante.nombres}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Residencia:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Telefono:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Empresa</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Dirección de la empresa:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Telefono:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">C.C No:</td>
                        {/* <td>{estudiante.edad}</td> */}
                        <td className="font-bold">Expedida en:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                        <td className="font-bold">E-Mail:</td>
                        {/* <td>{estudiante.documentoIdentidad}</td> */}
                    </tr>
                    </tbody>
                </table>
                    </Card>
                </Col>
            </Grid>         

            {/*  */}

            {/* 4- Situación academica */}


            <hr/>

            {/* Situación academica */}
            <h2 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '24px' }} >4. Situación Academica</h2>

            <hr/>

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                    <table className="table-auto">
                    <tbody>
                    <tr>
                        <td className="font-bold">A perdido alguna materia: </td>
                        {/* <td>{estudiante.apellidos}</td> */}
                        <td className="font-bold">Cual?:</td>
                        {/* <td>{estudiante.nombres}</td> */}
                    </tr>
                    <tr>
                        <td className="font-bold">Asignaturas con mayor dificultad:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Asignaturas con mayor facilidad:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Explique como ha sido su comportamiento o convivencia en el colegio inmediatamente anterior:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                    </tr>
                
                    </tbody>
                </table>
                    </Card>
                </Col>
            </Grid>         

            {/* 5- Información General */}


            <hr/>

            {/* Información General */}
            <h2 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '24px' }} >5. Información General</h2>

            <hr/>

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                    <table className="table-auto">
                    <tbody>
                    <tr>
                        <td className="font-bold">¿Quien le recomendo esta institución?</td>
                        {/* <td>{estudiante.apellidos}</td> */}
                        <td className="font-bold">Como padres de familia ¿Que conoce de la institución?:</td>
                        {/* <td>{estudiante.nombres}</td> */}
                        <td className="font-bold">Ustedes padres de familia ¿porque quieren que su hijo estudie en la institución?:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Porque:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Tiene algún familiar o hermano que esté estudiando en la institución?</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Que cursos:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Es esta una institución de caracter privado ¿Están ustedes en condiciones de asumir responsablemente todos los costos de servicio educativo?:</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                        <td className="font-bold">Empresa</td>
                        {/* <td colSpan="3">{estudiante.lugarNacimiento}, {estudiante.fechaNacimiento}</td> */}
                    </tr>
                    </tbody>
                </table>
                    </Card>
                </Col>
            </Grid>         

            {/*  */}

            {/* Observaciones */}


            <div className="w-4/4 bg-white mx-auto p-1">
                    <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>OBSERVACIÓN: La adquisición de este formulario no garantiza el cupo. y no se hará la devolución del valor del mismo. Debe traerse diligenciado el dia de la entrevista Psicóloga</h3>

            </div>


            {/*FIRMAS */}


            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                    <table className="table-auto">
                    <tbody>
                    <tr>
                        <td className="font-bold">fIRMA ESTUDIANTE: _______________________ </td>
                    </tr>
                    <tr>
                        <td className="font-bold">FIRMA PADRE O ACUDIENTE: ____________________</td>
                        <td className="font-bold">FIRMA PADRE O ACUDIENTE: ____________________</td>
                    </tr>
                
                    </tbody>
                </table>
                    </Card>
                </Col>
            </Grid>  



            {/*  */}
            


        </div>
    )
}

export default Pdf;
