// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Flex, Grid, Col, Card } from "@tremor/react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import './Pdf.css';

const URIINFOBASIC = "http://localhost:8000/himalayaSchool/getInfoBasicEstu";
const URIESTUDIOS = "http://localhost:8000/himalayaSchool/getEstudios";
const URIACUDIENTES = "http://localhost:8000/himalayaSchool/getAcudientes";

const Pdf = () => {
    const [infobasic, setInfobasic] = useState([]); //array infobasic
    const [estudios, setEstudios] = useState([]); //array estudios
    const [acudientes, setAcudientes] = useState([]); //array acudientes

    const { id } = useParams();//Id del estudiante
    //traer data
    const busqueda = async () => {
        const resInfoBasic = await axios.get(URIINFOBASIC + id)
        const resEstudios = await axios.get(URIESTUDIOS + id)
        const resAcudientes = await axios.get(URIACUDIENTES + id)

        //Respuesta URIINFOBASIC
        if (resInfoBasic.status == '200') {
            console.log(resInfoBasic.data[0]);
            setInfobasic(resInfoBasic.data[0]);
        } else {
            console.log('Error metodo PDF');
        }
        //Respuesta URIESTUDIOS
        if (resEstudios.status == '200' && resEstudios.data != null) {
            console.log(resEstudios.data);
            setEstudios(resEstudios.data);
        } else {
            console.log('Error metodo PDF');
        }
        //Respuesta URIACUDIENTES
        if (resAcudientes.status == '200') {
            console.log(resAcudientes.data);
            setAcudientes(resAcudientes.data);
        } else {
            console.log('Error metodo PDF');
        }
    }

    //Ejecutar la funcion de busqueda al cargar el componente

    const conponentPDF = useRef();

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: "Userdata"
    });

    useEffect(() => {
        generatePDF();
        busqueda();
    }, [],infobasic)

    // Estilos  CSS -- Nota: Moverlos al archivo css
    const pdfContainerStyle = {
        width: "100%",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif"
    };

    const headingStyle = {
        fontSize: "15px",
        fontWeight: "bold",
        textAlign: "center",
        margin: "10px 0"
    };

    const hrStyle = {
        border: "1px solid #1ba7e8",
        margin: "5px 0"
    };
    const hrStyleLine = {
        border: "0.5px solid #000",
        margin: "2px 0"
    };
    // fin estilos
    console.log("--------------------------------------------->"+infobasic.estu_apellidos);
    return (
        <div ref={conponentPDF} style={pdfContainerStyle} className="w-3/4 bg-white">   {/** Centrar contenido del div --> CARD**/}
            <Flex justifyContent="start" alignItems="start" className='mt-10 space-x-10'>
                <div className="w-40">
                    <img className="object-top object-scale-down h-24 w-96" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.himalayaschool.edu.co%2Findex.php%2Fhome-2%2Fnuestros-simbolos&psig=AOvVaw2mpVYxB5EVS7PIK9Eov4d5&ust=1699742851843000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKDRh_XBuoIDFQAAAAAdAAAAABAE" alt="Imagen del colegio" />
                </div>
                <div className="text-center w-6/12 h-1">
                    <h1 className="text-blue-500 text-3xl font-semibold">COLEGIO HIMALAYA</h1>
                    <h2 className="text-blue-500 text-2xl">HIMALAYA SCHOOL</h2>
                    <h3 className="text-blue-500 text-1xl font-normal">FUSAGASUGA - CUNDINAMARCA</h3>
                </div>
            </Flex>
            {/* info licencias */}
            <div className="w-4/4 bg-white mx-auto p-1">
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '9px' }}>LICENCIA DE INICIACION DE LABORES N° 001858 DEL 15 DE DICIEMBRE DE 1993.</h3>
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '9px' }}>LICENCIA DE FUNCIONAMIENTO PARA LA PRESTACIÓN DEL SERVICIO EDUCATIVO FORMAL DE NATURALEZA PRIVADA N° 002040 DEL 01 DE AGOSTO DE 2002.</h3>
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '9px' }}>LICENCIA DE FUNCIONAMIENTO Y APROBACIÓN DE ESTUDIOS PARA PREESCOLAR, BÁSICA SECUNDARIA Y MEDIA VOCACIONAL No #16.</h3>
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '9px' }}>DEL 01 DE DICIEMBRE DEL 2005 Y RESOLUCIÓN DE AUTORIZACIÓN DE CAMBIO DE SEDE Y RAZÓN SOCIAL No. 924 DEL 03 DE MARZO DEL 2018</h3>
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '9px' }}>DE LA SECRETARIA DE EDUCACIÓN DE FUSAGASUGÁ DE NATRUALEZA PRIVADA, CALENDARIO A, CARACTER MIXTO, JORNADA UNICA</h3>
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '9px' }}>CODIGO DANE No 325290001851. CODIGO ICFES 130096</h3>
                <h3 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '13px' }}>PRE-ESCOLAR * BÁSICA PRIMARIA * BÁSICA SECUNDARIA * MEDIA VOCACIONAL</h3>
                <h3 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '13px' }}>BACHILLERATOR ACADÉMICO CON ENFASIS EN IDIOMAS Y CIENCIAS</h3>
                <h3 className="text-center text-base font-extralight font-bold mr-6" style={{ fontSize: '20px' }}>FORMULARIO DE PRE-MATRICULA-AÑO ACADEMICO 202 _____</h3>
            </div>

            {/* Información del estudiante */}

            <hr style={hrStyle} />

            <h2 style={headingStyle}>1. INFORMACIÓN BÁSICA DEL ESTUDIANTE</h2>

            <hr style={hrStyle} />

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                        <div className="tabla-container">
                            <table className="custom-table-basic">
                                <tbody>
                                    <tr>                            
                                        <td><strong>Apellidos:</strong> {infobasic.estu_apellidos}</td>
                                        <td><strong>Nombres: </strong>{infobasic.estu_nombres}</td>
                                    </tr>
                                    <tr>
                                        <td ><strong>Lugar y Fecha de Nacimiento:</strong> </td>
                                        <td><strong>Edad:</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Documento de Identidad:</strong></td>
                                        <td><strong>De</strong> Fusagasuga</td>
                                    </tr>
                                    <tr>
                                        <td ><strong>Grado al que Aspira:</strong> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Col>
            </Grid>

            {/*  */}

            {/* Estudios Aprobados  */}

            <hr style={hrStyle} />

            {/* Información del estudiante */}
            <h2 style={headingStyle}>2. ESTUDIOS APROBADOS COLEGIOS Y AÑOS</h2>

            <hr style={hrStyle} />
            <div className="tabla-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">PRE-ESCOLAR</th>
                            <th className="border px-4 py-2">COLEGIO/AÑO</th>
                            <th className="border px-4 py-2">BASICA SECUNDARIA</th>
                            <th className="border px-4 py-2">COLEGIO/AÑO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">PRE-JARDIN</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">SEXTO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">JARDIN</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">SEPTIMO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">TRANSICIÓN</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">OCTAVO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2">BASICA PRIMARIA</th>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">NOVENO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">PRIMERO</td>
                            <td className="border px-4 py-2"></td>
                            {/**MEDIA VOCACIONAL */}
                            <td className="border px-4 py-2"><strong>MEDIA VOCACIONAL</strong></td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">SEGUNDO</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">DECIMO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">TERCERO</td>
                            <td className="border px-4 py-2"></td>
                            <td className="border px-4 py-2">UNDECIMO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">CUARTO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">QUINTO</td>
                            <td className="border px-4 py-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* </div> */}
            {/* 3- DATOS FAMILIARES */}

            <div className="mt-20">
                <hr style={hrStyle} />

                {/* Datos Familiares */}
            </div>
            <h2 style={headingStyle}>3. DATOS FAMILIARES</h2>

            <hr style={hrStyle} />

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                        <div className="tabla-container">
                            <table className="custom-table-fam">
                                <tbody>
                                    {/**Acudiente 1 ------- */}
                                    <tr>
                                        <td colSpan={3}><strong>NOMBRE DEL PADRE:</strong>  PAPA XXXXXXXXXX</td>
                                        <td><strong>PROFESION:</strong>  ARQUITECTO</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><strong>RESIDENCIA:</strong>   XXXXXXXXXX</td>
                                        <td><strong>TELEFONO:</strong>  xxxxxxxxx</td>
                                        <td><strong>EMPRESA:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}><strong>DIRECCION DE LA EMPRESA:</strong>   XXXXXXXXXX</td>
                                        <td><strong>TELEFONO:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CC N°:</strong>   XXXXXXXXXX</td>
                                        <td colSpan={2}><strong>EXPEDIDA EN:</strong>  xxxxxxxxx</td>
                                        <td><strong>E-MAIL:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    {/**Acudiente 2 ------- */}
                                    <tr>
                                        <td colSpan={3}><strong>NOMBRE DEL PADRE:</strong>  PAPA XXXXXXXXXX</td>
                                        <td><strong>PROFESION:</strong>  ARQUITECTO</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><strong>RESIDENCIA:</strong>   XXXXXXXXXX</td>
                                        <td><strong>TELEFONO:</strong>  xxxxxxxxx</td>
                                        <td><strong>EMPRESA:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}><strong>DIRECCION DE LA EMPRESA:</strong>   XXXXXXXXXX</td>
                                        <td><strong>TELEFONO:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CC N°:</strong>   XXXXXXXXXX</td>
                                        <td colSpan={2}><strong>EXPEDIDA EN:</strong>  xxxxxxxxx</td>
                                        <td><strong>E-MAIL:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    {/**Acudiente 3 ------- */}
                                    <tr>
                                        <td colSpan={3}><strong>NOMBRE DEL PADRE:</strong>  PAPA XXXXXXXXXX</td>
                                        <td><strong>PROFESION:</strong>  ARQUITECTO</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}><strong>RESIDENCIA:</strong>   XXXXXXXXXX</td>
                                        <td><strong>TELEFONO:</strong>  xxxxxxxxx</td>
                                        <td><strong>EMPRESA:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}><strong>DIRECCION DE LA EMPRESA:</strong>   XXXXXXXXXX</td>
                                        <td><strong>TELEFONO:</strong>  xxxxxxxxx</td>
                                    </tr>
                                    <tr>
                                        <td><strong>CC N°:</strong>   XXXXXXXXXX</td>
                                        <td colSpan={2}><strong>EXPEDIDA EN:</strong>  xxxxxxxxx</td>
                                        <td><strong>E-MAIL:</strong>  xxxxxxxxx</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Col>
            </Grid>
            {/* 4- Situación academica */}

            <hr style={hrStyle} />

            {/* Situación academica */}

            <h2 style={headingStyle}>4. SITUACIÓN ACADÉMICA</h2>

            <hr style={hrStyle} />

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                        <div className="tabla-container">
                            <table className="custom-table-academic">
                                <tbody>
                                    <tr>
                                        <td><strong>HA PERDIDO ALGUNA MATERIA?</strong></td>
                                        <td style={{ width: '5px' }} colSpan={2}><strong>SI</strong></td>
                                        <td><strong>NO</strong></td>
                                        <td colSpan={2}><strong>CUAL?</strong></td>
                                        <td colSpan={2}></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}><strong>ASIGNATURAS CON MAYOR DIFICULTAD</strong></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}><strong>ASIGNATURAS CON MAYOR FACILIDAD</strong></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}><strong>EXPLIQUE COMO HA SIDO SU COMPORTAMIENTO O CONVIVENCIA EN EL COLEGIO INMEDIATAMENTE ANTERIOR</strong></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}><strong>D.S. (DESEMPEÑO SUPERIOR)</strong></td>
                                        <td colSpan={3}><strong>D.A. (DESEMPEÑO ALTO)</strong></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3}><strong>D.Bs. (DESEMPEÑO BASICO)</strong></td>
                                        <td colSpan={3}><strong>D.Bj. (DESEMPEÑO BAJO)</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </Col>
            </Grid>

            {/* 5- Información General */}
            <hr style={hrStyle} />

            {/* Información General */}
            <h2 style={headingStyle} >5. INFORMACIÓN GENERAL</h2>

            <hr style={hrStyle} />

            <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card>
                        <table className="custom-table-academic">
                            <tbody>
                                <tr>
                                    <td className="font-bold" colSpan={3}>¿QUIEN LE RECOMENDO ESTA INSTITUCIÓN?</td>
                                </tr>
                                <tr>
                                    <td className="font-bold" colSpan={3}>COMO PADRES DE FAMILIA ¿QUE CONOCE DE LA INSTITUCIÓN?</td>
                                </tr>
                                <div className="mt-4">
                                    <hr style={hrStyleLine} />
                                </div>
                                <div className="mt-6">
                                    <hr style={hrStyleLine} />
                                </div>
                                <tr>
                                    <td className="font-bold" colSpan={3}>USTEDES PADRES DE FAMILIA ¿PORQUE QUIEREN QUE SU HIJO ESTUDIE EN LA INSTITUCIÓN?</td>
                                </tr>
                                <div className="mt-4">
                                    <hr style={hrStyleLine} />
                                </div>
                                <div className="mt-6">
                                    <hr style={hrStyleLine} />
                                </div>
                                <div className="mt-5">
                                    <tr>
                                        <td className="font-bold" colSpan={3}>SU HIJO (A) DESEA ESTUDIAR BACHILLERATO ACADEMICO CON ENFASIS EN IDIOMAS Y CIENCIAS?</td>
                                    </tr>
                                </div>
                            </tbody>
                        </table>
                        <table className="custom-table-academic">
                            <tbody>
                                <tr>
                                    <td className="font-bold" >SI</td>
                                    <td className="font-bold" >NO</td>
                                    <td className="font-bold" >¿POR QUE?</td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className="mt-4" colSpan={3}>
                                            <hr style={hrStyleLine} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3}>
                                        <div className="mt-4" colSpan={3}>
                                            <hr style={hrStyleLine} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="custom-table-academic">
                            <tbody>
                                <tr>
                                    <td className="font-bold" >¿TIENE ALGUN FAMILIAR O HERMANO (A) QUE ESTE ESTUDIANDO EN ESTA INSTITUCION?</td>
                                </tr>
                                <tr>
                                    <td className="font-bold" >¿QUE CURSOS?</td>
                                </tr>
                                <tr>
                                    <td className="font-bold" >EN ESTA INSTITUCION DE CARACTER PRIVADO ¿ESTAN USTEDES EN CONDICIONES DE ASUMIR RESPONSABLEMENTE TODOS LOS COSTOS DE SERVICIO EDUCATIVO?</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="custom-table-academic">
                            <tbody>
                                <tr>
                                    <td className="font-bold" >SI</td>
                                    <td className="font-bold" >NO</td>
                                </tr>
                            </tbody>
                        </table>
                    </Card>
                </Col>
            </Grid >
            {/* Observaciones */}
            <div style={pdfContainerStyle} className="w-4/4 bg-white mx-auto p-1">
                <h3 className="text-center text-base font-extralight mr-6" style={{ fontSize: '11px' }}>OBSERVACIÓN: La adquisición de este formulario no garantiza el cupo. y no se hará la devolución del valor del mismo. Debe traerse diligenciado el dia de la entrevista Psicóloga</h3>
            </div>
            {/*FIRMAS */}

            <div style={pdfContainerStyle} className="w-4/4 bg-white mx-auto p-1">

                <Grid numItems={1} numItemsSm={1} numItemsLg={1} className="gap-2">
                    <Col numColSpan={1} numColSpanLg={1}>
                        <Card>
                            <div className="mt-5">
                                <table className="custom-table-firma-estu">
                                    <tbody>
                                        <tr>
                                            <td className="font-bold">FIRMA ESTUDIANTE: _______________________ </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-10">
                                <table className="custom-table-firma-acud">
                                    <tbody>
                                        <tr>
                                            <td className="font-bold">FIRMA PADRE O ACUDIENTE: _______________________</td>
                                            <td className="font-bold">FIRMA PADRE O ACUDIENTE: _______________________</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </Col>
                </Grid>

            </div>


            {/*  */}



        </div >
    )
}

export default Pdf;

