import { Card, Callout } from '@tremor/react';
import DataTable from 'react-data-table-component'; //importacion componente de tablas de data
import React from "react";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
const TableProcedencias = () => {

    const data = []
    const form_procedencias = JSON.parse(localStorage.getItem('form_procedencias'));
    for (let key in form_procedencias) {
        // data = Object.entries(form_procedencias[key]);
        // console.log(form_procedencias[key]);
        data.push(form_procedencias[key]);
    }

    //    console.log(data);
    const columns = [
        {
            name: 'Ciudad',
            selector: data => data.ciudad_procedencia,
        },
        {
            name: 'Colegio',
            selector: data => data.colegio_procedencia,
        },
        {
            name: 'Grados cursados',
            selector: data => `${data.g_inicio} - ${data.g_fin}`,
        },
        {
            name: 'Repitente?',
            selector: data => data.repitente === true ? "Si" : "No"
        },
        {
            name: 'Motivo Retiro',
            selector: data => data.motivo_retiro
        }
    ];

    if (data.length > 0) {
        return (
            <>
                <Card>
                    <DataTable
                        columns={columns}
                        data={data}
                    />
                </Card>
            </>
        )
    } else {
        return (
            <Callout
                title="No se han asignado registros de escolaridad"

                icon={ExclamationCircleIcon}
                color="rose"
                className="mt-4 h-12"
            > </Callout>
        )
    }

}

export default TableProcedencias;