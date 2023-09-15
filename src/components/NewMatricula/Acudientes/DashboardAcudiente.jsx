import {
    Card,
    Flex,
    Tab,
    TabList,
    TabGroup,
    TabPanels,
    TabPanel,
    Divider,
    Metric,
    Text
} from '@tremor/react';
import { FolderMinusIcon, ListBulletIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import FormAcudiente from './FormAcudiente';
// import ConsultaAcudiente from './ConsultaAcudiente';
const DashBoardAcudiente = () => {
    const [selectedView, setSelectedView] = useState('formulario');
    return (

        <div className="grid min-h-screen max-h-full min-w-min max-w-full place-items-center bg-slate-200" >
            {/* min-h-screen --> como minimo se ajuste a toda la pantalla
                max-h-full --> como maximo se ajuste al contenido si es mas grande que la pantalla
                min-w-min --> minimo del contenedor al ancho del contenido
                max-w-full --> maximo contenedor toda la ventana
            */}
            <Card className="max-w-3xl center max-h-" decoration="top" decorationColor="indigo" >
                {/** Alineacion horizontal TIUTLO TOGLE con  FLEX */}
                <Flex
                    className="space-x-8"
                    justifyContent="between"
                    alignItems="center"
                > {/**Titulo */}
                    <Metric>Hoja de vida estudiante</Metric>
                </Flex>
                <Text>Informacion padres o acudientes</Text>
                <TabGroup>
                    <Flex justifyContent='end'>
                        <TabList className="mt-8">
                            <Tab icon={FolderMinusIcon}>Nuevo Acudiente</Tab>
                            <Tab icon={ListBulletIcon}>Buscar Acudiente</Tab>
                        </TabList>
                    </Flex>
                    <Divider />
                    <TabPanels>
                        <TabPanel>
                            <FormAcudiente/>
                        </TabPanel>
                        <TabPanel>
                            <h2>dos</h2>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Card>
        </div>
    );
}
export default DashBoardAcudiente