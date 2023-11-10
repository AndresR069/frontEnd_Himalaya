import { ArchiveBoxXMarkIcon, MagnifyingGlassCircleIcon, PlusSmallIcon, PencilIcon, DocumentIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
import DataTable from 'react-data-table-component'; //lib --> data table  https://react-data-table-component.netlify.app/?path=/docs/getting-started-examples--page
import { Link } from 'react-router-dom'; //rutas en el dom
import { Card, Title, Flex, Button, Divider, Callout, Text, Badge, Grid, Icon } from '@tremor/react'
import Exel from './ExelExport/Exel';
import Pdf from './PdfExport/Pdf';
const tablaUrl = "http://localhost:8000/himalayaSchool/estudiantes";//URL Back-end llenado de tabla principal


const TableEstudent = () => {
    /**variables de captura */
    const [estado, setEstado] = useState('ACTIVO')
    const [curso, setcurso] = useState('PRE-JARDIN')
    const [nivel1, setnivel1] = useState(true)
    const [nivel2, setnivel2] = useState(true)
    const [nivel3, setnivel3] = useState(true)
    const [nivel4, setnivel4] = useState(true)

    const [pending, setPending] = useState(true); //notificara carga de datos en true -- false -- cargando
    const [rows, setRows] = useState([{}]); //filas tabla dashboard

    //Funcion post con retorno de datos***************************
    const [data, setData] = useState([]);

    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    const customIdSucces = "custom-id-error";//Id toast error 

    //muestra notificacion segun el tipo y el texto enviados
    function notificacion(text, type) {

        if (type === 'error') {
            toast.error(text, { autoClose: 3000, toastId: customIdErr, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'succes') {
            toast.success(text, { autoClose: 3000, toastId: customIdSucces, position: toast.POSITION.BOTTOM_RIGHT })
        }
    }
    //--------columnas de la tabla ---------------------------------------
    const columns = [
        {
            name: 'Acciones',
            selector: data => <> <Link to={`/edit/${data.id_estudiante}`} className='btn btn-info'><Icon size="md" icon={PencilIcon} tooltip="Editar" /> </Link>   <Link to={`/pdf/${data.id_estudiante}`}><Icon size="md" icon={DocumentIcon} tooltip="Generar pdf" ></Icon></Link></>,
             //selector: data => <> <Link to={`/edit/${data.id_estudiante}`} className='btn btn-info'><Icon size="md" icon={PencilIcon} tooltip="Editar" /> </Link>   <Icon size="md" icon={DocumentIcon} tooltip="Generar pdf" ><Pdf></Pdf></Icon></>,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Estado',
            selector: data => data.estado === 'ACTIVO' ? (<Badge color="teal" icon={ArchiveBoxXMarkIcon} >{data.estado}</Badge>) : (<Badge color="red" icon={ArchiveBoxXMarkIcon} >{data.estado}</Badge>),
            sortable: true,
            width: "160px"
        },
        {
            name: 'Documento',
            selector: data => data.estu_documento,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Tipo Documento',
            selector: data => data.estu_tipo_documento,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Nombres',
            selector: data => data.estu_nombres,
            sortable: true,
            width: "200px"
        },
        {
            name: 'Apellidos',
            selector: data => data.estu_apellidos,
            sortable: true,
            width: "200px"
        },
        {
            name: 'Fecha Matricula',
            selector: data => data.fecha_matricula,
            sortable: true,
            width: "200px"
        },
        {
            name: 'Curso',
            selector: data => data.curso,
            sortable: true,
            width: "130px"
        },
        {
            name: 'Lugar Expedicion',
            selector: data => data.estu_lugar_expedicion,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Fecha Nacimiento',
            selector: data => data.estu_fecha_nacimiento,
            sortable: true,
            width: "160px"
        },
        {
            name: 'Edad',
            selector: data => data.edad,
            sortable: true,
        },
        {
            name: 'Direccion',
            selector: data => data.estu_ciudad === null ? `${data.estu_direccion}` : `${data.estu_direccion} - ${data.estu_ciudad}`,
            sortable: true,
            width: '250px'
        },
        {
            name: 'Vacuna (Covid-19)',
            selector: data => data.nombre_vacuna_covid,
            sortable: true,
            width: "160px"
        },
    ];
    //Loader tabla--------------------------------------------------
    const CustomLoader = () => (
        <div style={{ padding: '24px' }}>
            <Spinner />
            <div>Listando estudiantes...</div>
        </div>
    );

    const rotate360 = keyframes`
     from {
       transform: rotate(0deg);
     }
    
      to {
        transform: rotate(360deg);
      }
    `;

    const Spinner = styled.div`
            	margin: 16px;
            	animation: ${rotate360} 1s linear infinite;
            	transform: translateZ(0);
            	border-top: 2px solid grey;
            	border-right: 2px solid grey;
            	border-bottom: 2px solid grey;
            	border-left: 4px solid black;
            	background: transparent;
            	width: 80px;
            	height: 80px;
            	border-radius: 50%;
            `;
    //-------------------------------------------------------------

    const store = useCallback(async () => {
        //e.preventDefault()
        await axios.post(tablaUrl, {
            estado: estado,
            curso: curso,
            nivel1: nivel1,
            nivel2: nivel2,
            nivel3: nivel3,
            nivel4: nivel4
        }).then(res => {
            setData(res.data);
        }).catch(error => {
            notificacion('Fallo Conexion DB', 'error') //envia texto, y tipo de notificacion que sera comparada en un if
            console.log(error);
        })
    }, [curso, nivel1, nivel2, nivel3, nivel4, estado]) //useEffectahora depende de la variable de consulta -- las incluimos en la matriz de dependencias. 
    useEffect(() => { //ejecute funcion una sola vez -- apenas se renderice el componente
        store();
    }, [store]) //funcion captura y envio para la consulta de estudiantes al back

    //loader para la traida de data a la tabla
    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(data);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [data])

    /** Cambiar y capturar estado checkbox -->uno*/
    const handlenivel1 = () => {
        setnivel1(!nivel1);

    }; /** Captura el valor, lo cambia si se hizo un click y lo manda a la variable isChenked */

    /** Cambiar y capturar estado checkbox -->dos*/
    const handlenivel2 = () => {
        setnivel2(!nivel2);

    }; /** Captura el valor, lo cambia si se hizo un click y lo manda a la variable isChenked */

    /** Cambiar y capturar estado checkbox -->tres*/
    const handlenivel3 = () => {
        setnivel3(!nivel3);

    }; /** Captura el valor, lo cambia si se hizo un click y lo manda a la variable isChenked */

    /** Cambiar y capturar estado checkbox -->cuatro*/
    const handlenivel4 = () => {
        setnivel4(!nivel4);

    }; /** Captura el valor, lo cambia si se hizo un click y lo manda a la variable isChenked */



    return (
        
        <Card className="max-h-fit max-h-screen">
            <ToastContainer /> {/** Necesario para que la notifacion se muestre --------------------- */}

            <Title>Estudiantes Matriculados</Title>
            <Divider />

            <Card className="max-w-full" decoration="bottom" decorationColor="indigo">
                <Grid numItems={1} numItemsSm={2} numItemsMd={2} numItemsLg={4} className='mt-6 gap-x-2 gap-y-2'>
                    <Flex alignItems='center' justifyContent='justify-start' className='-mt-1.5 space-x-1.5'>
                        <Callout
                            title="Filtrado:"
                            icon={MagnifyingGlassCircleIcon}
                            color="green"
                            className='mt-0'
                        />
                    </Flex>
                    <Flex alignItems='center' justifyContent='start' className='-mt-1.5 space-x-1.5' >
                        <Text>Seleccione curso: </Text>
                        <select id="underline_select" className="block py-2.5 px-0 max-w-min border-gray-200 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            defaultValue={'PRE-JARDIN'}
                            onChange={(e) => setcurso(e.target.value)} >
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

                    </Flex>
                    <Flex alignItems='center' justifyContent='start' className='-mt-1.5 space-x-1.5'>
                        <Text> Estado: </Text>
                        <select id="underline_select" className="block py-2.5 px-0 max-w-min text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            defaultValue={'PARVULOS'}
                            onChange={(e) => setEstado(e.target.value)} >
                            <option value='ACTIVO'>Activo</option>
                            <option value='INACTIVO'>Inactivo</option>
                        </select>
                    </Flex>
                    <Flex alignItems='center' justifyContent='start' className='-mt-1.5 space-x-1.5'>
                        <Text>Nivel: </Text>
                        <Text> 1 </Text>
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={nivel1}
                            onChange={handlenivel1}
                        />
                        <Text> 2 </Text>
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={nivel2}
                            onChange={handlenivel2} />
                        <Text> 3 </Text>
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={nivel3}
                            onChange={handlenivel3} />
                        <Text> 4 </Text>
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={nivel4}
                            onChange={handlenivel4} />

                    </Flex>
                </Grid>
            </Card>

            <Flex justifyContent="start" className='space-x-10 mt-6'>
                <Link to='/Restudiante'>
                    <Button
                        size="xs"
                        variant="secondary"
                        icon={PlusSmallIcon}
                    >Agregar Matricula</Button>
                </Link>

                <Exel exelData={data} fileName={curso}></Exel>{/*Componente exportacion data a exel */}
            </Flex>

            {/**tabla data estudiantes */}
            <DataTable
                columns={columns}
                data={rows}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                persistTableHead
                pagination
            />

        </Card>
    )
}

export default TableEstudent