import React, { useEffect } from "react";
import { Card, Grid, Title, BarChart } from "@tremor/react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify' //libreria de notifaciones
const URI = "http://localhost:8000/himalayaSchool/genero";//URL Back-end llenado de tabla principal


const Consultas = () => {
    const [value, setValue] = React.useState(null);
    const [generos, setData] = React.useState([]);

    //Obtener la data del estudiante - Consulta
    const busqueda = async () => {
        const res = await axios.get(URI)

        if (res.status == '200') {
            const data = [];
            for (const elemento of res.data) {
                // Convierte los valores de "Mujeres" y "Hombres" en enteros
                const mujeres = parseInt(elemento.Mujeres);
                const hombres = parseInt(elemento.Hombres);
                // Crea un nuevo objeto con las propiedades deseadas
                const nuevoObjeto = {
                    curso: elemento.curso,
                    Mujeres: mujeres,
                    Hombres: hombres
                };
                data.push(nuevoObjeto);
            }
            setData(data)
        } else {
            notificacion('Error DB', 'error')
        }
    }
    //Ejecutar la funcion de busqueda al cargar el componente
    useEffect(() => {
        busqueda();
    }, [])

    const customIdErr = "custom-id-error";//Id toast error ***EVITA DUPLICADOS AL HACER MULTIPLES CLICK*******
    //muestra notificacion segun el tipo y el texto enviados
    function notificacion(text, type) {

        if (type === 'error') {
            toast.error(text, { autoClose: 3000, toastId: customIdErr, position: toast.POSITION.BOTTOM_RIGHT })
        }
    }
    return (
        <div >
            {/* Main section */}
            <Card className="mt-6">
                <div className="h-96" >
                    <Title>Mujeres y Hombres matriculados</Title>
                    <BarChart
                        className="mt-6"
                        data={generos}
                        index="curso"
                        categories={["Mujeres", "Hombres"]}
                        colors={["amber", "blue"]}
                        yAxisWidth={40}
                        onValueChange={(v) => setValue(v)}
                    />

                </div>
            </Card>

            {/* KPI section */}
            {/* <Grid numItemsMd={2} className="mt-6 gap-6">
                <Card>
             
                    <div className="h-28" />
                </Card>
                <Card>
                   
                    <div className="h-28" />
                </Card>
            </Grid> */}
        </div>
    )
}

export default Consultas;