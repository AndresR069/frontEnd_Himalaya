import { Flex, TabGroup, Tab, TabList, Button, Bold, Divider, Metric, Text, Title } from "@tremor/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Animation from "./Animation";
import Login from "./Login";
const DashboardLogin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (

        <div className="flex w-full h-screen">
            {/* <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <Flex>
                        <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                            <TabList variant="solid">
                                <Tab icon={LockOpenIcon}>Chart</Tab>
                                <Tab icon={IdentificationIcon}>List</Tab>
                            </TabList>
                        </TabGroup>
                    </Flex>
                </div>
            </div> */}
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <Flex className="space-x-8" justifyContent="start" alignItems="center">

                        <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
                            <TabList variant="solid">
                                <Tab icon={AcademicCapIcon}>     <Title>Himalaya School</Title></Tab>
                            </TabList>
                        </TabGroup>
                    </Flex>
                    <Divider />
                    <h1 className="text-5xl font-semibold">Bienvenido!</h1>
                    {/* <Text className="mt-8">
                        <Bold >Asset Allocation</Bold>
                    </Text> */}
                    {selectedIndex === 0 ? (
                        <Login />
                    ) : (
                        <>

                        </>
                    )}
                </div>

            </div>
            <Animation />
        </div>
    );
}
export default DashboardLogin;