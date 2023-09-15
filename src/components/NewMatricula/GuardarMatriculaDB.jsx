import { Button } from "@tremor/react";
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom';
import React from "react";
import { toast } from 'react-toastify' //libreria de notifaciones
import axios from "axios";

const URI_NEW_MATRICULA = 'http://localhost:8000/himalayaSchool/newMatricula';//ruta para crear una matricula

const GuardarMatriculaDB = (acudientesForm) => {

    const navigate = useNavigate() //habilita la variable navegacion -->nos redigira una vez realizado la insercicon

    //notifaciones ...........documentacion -- react-tostify..............
    function notificacion(text, type) {

        if (type === 'error') {
            toast.error(text, { autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'info') {
            toast.info(text, { autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT })
        }
        if (type === 'succes') {
            toast.success(text, { autoClose: 4000, position: toast.POSITION.BOTTOM_CENTER })
        }
    }
    //procedimiento para verificar la cantidad de acudientes registrados y enviar al localstorage
    const store = () => {
        try {
            //destructuracion del objeto
            let { acudientes } = acudientesForm;

            //console.log(tipoAsignacion);
            //parsear a JSON, para lograr recorrer el objeto retornado}}***************************
            const arrayAcudientes = JSON.parse(acudientes);
            //console.log(arrayAcudientes.length);
            if (arrayAcudientes.length > 0 && arrayAcudientes.length <= 3) {
                localStorage.setItem('form_data_acud', JSON.stringify(arrayAcudientes)); //form-- > send-- localStorage
                //si el contador ya recorrio todos los elementos             
                saveDB().then(resp => { //Si se resuvleve la inserccion a la DB, redirija al dashborad Principal
                    //console.log("respuesta" + resp)
                    if (resp === 'resolved') {
                         localStorage.removeItem('form_data_estudent');
                         localStorage.removeItem('form_matricula');
                         localStorage.removeItem('form_procedencias');
                         localStorage.removeItem('form_data_acud');
                         localStorage.removeItem('form_salud');
                         notificacion('Matriculada creada exitosamente!', 'succes') //succes si guarado db exitoso
                         asyncCall();
                    }
                }).catch(err => {
                    console.log(err);
                }); // llama funcion guardado formularios en DB
            } else {
                //si el array acudientes no viene cargado por default vacio
                notificacion('Ingrese minimo un acudiente', 'info')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //funcion asyncrona que despues de 4 segundos retornara "resolved" para indicar la validacion y retornar al dashboard
    function resolveRedireccion() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 4000);
        });
    }
    //llama a la funcion redireccion, una vez resuelta redirecciona al dashboard
    async function asyncCall() {
        console.log('Redireccionando...');
        const result = await resolveRedireccion();
        console.log(result);
        if (result === 'resolved') {
            //window.alert('entro a guardar back-end')
            navigate('/')
        }
        // Expected output: "resolved"
    }
    async function saveDB() {
        //console.log(form_procedencia)
        // console.log(form_data_student)
        // console.log(form_matricula)
        // console.log(form_salud)
        // console.log(form_info_acud)

        try {
            const form_data_student = JSON.parse(localStorage.getItem('form_data_estudent'));
            const form_matricula = JSON.parse(localStorage.getItem('form_matricula'));
            const form_procedencia = JSON.parse(localStorage.getItem('form_procedencias'));
            const form_info_acud = JSON.parse(localStorage.getItem('form_data_acud'));
            const form_salud = JSON.parse(localStorage.getItem('form_salud'));
            // console.log('entro try')

            /*tipoAsignacion valida Si el componente FormAcudiente (1) llamo o componente ConsultaAcudiente (2) llamo
              */
            let { tipoAsignacion } = acudientesForm;


            //Si viene del formulario de registro acudientes haga esto
            if (form_data_student != null && form_matricula != null && form_info_acud != null && form_salud != null) {
                //console.log("formularios llenos");
                // console.log('entro if')
                await axios.post(URI_NEW_MATRICULA, {
                    form_data_student,
                    form_matricula,
                    form_procedencia,
                    form_salud,
                    form_info_acud,
                    tipoAsignacion
                })
                return 'resolved'
            } else {
                notificacion("Formularios incompletos Inicie nuevamente proceso de matricula", 'info') // alerta de navegacion incorrecta
            }

        } catch (err) {
            notificacion('Fallo Conexion DB', 'error')
            return err
        }
    }
    return (
        <Button size="xs" icon={ChevronDoubleRightIcon} onClick={store} importance="secondary">Matricular</Button>
    );
}

export default GuardarMatriculaDB;