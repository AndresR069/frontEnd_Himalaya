import React from "react";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
// Ahora puedes usar las funciones de la biblioteca XLSX

import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { Button } from '@tremor/react'
// const exportExel = () => {

const Exel = ({ exelData, fileName }) => {
    //     const ExelExportData = [
    //         { estu_documento: '5566655', estu_tipo_documento: 'cedula', estu_nombres: 'Juan Alberto', estu_apellidos: 'Ramirez Perez', estado: 'INACTIVO'},
    //         { estu_documento: '5555555', estu_tipo_documento: 'cedula', estu_nombres: 'camilo dos', estu_apellidos: 'rodriguez', estado: null},
    //         { estu_documento: '111111', estu_tipo_documento: 'cedula', estu_nombres: 'estudiantes tres', estu_apellidos: 'lampara', estado: null}
    //                      ]
    // const nombre_archivo = "prueba"
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExel = async () => {
        const ws = XLSX.utils.json_to_sheet(exelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const exelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([exelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName, fileExtension);
    }
    return (
        <>
            < Button
                size="xs"
                variant="secondary"
                icon={ArrowDownIcon}
                onClick={exportToExel}>
                    Export Exel
            </Button>
        </>
    );
}

export default Exel;