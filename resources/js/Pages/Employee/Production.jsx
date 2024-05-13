import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import PrintTable from '@/Components/PrintTable';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';


export default function Production({ auth, boxes, order, artists, printers, err }) {

    const [selectedRecord, setSelectedRecord] = useState(null);
    const [selectedLineup, setSelectedLineup] = useState("");
    const columns = [
        { title: 'Team', field: 'team_name' },
        { title: 'Apparel', field: 'product_name' },
        { title: 'Due Date', field: 'due_date' },
        // { title: 'Status', field: 'status' },
        { title: 'Errors', field: 'error_count' }
    ];

    // State to store the selected record


    useEffect(() => {
        console.log(selectedLineup);
        console.log(selectedRecord);
    }, [selectedLineup, selectedRecord]);

    const handleRecordSelect = async (record) => {
        setSelectedRecord(record);
        try {
            const response = await axios.get(`/api/get-errors/${record.order_id}`);
            const errors = response.data;

            setSelectedLineup(errors);

            console.log(selectedRecord); // Check the state after setting
        } catch (error) {
            console.error('Error fetching lineup errors:', error);
        }
    };

    const handleReprintErrors = async () => {
        try {
            // Update the status of errors to null
            await axios.put(`/api/reprint-errors/${selectedRecord.order_id}`, { status: null });

            window.location.href = '/employee/production'
            // Refresh the table by refetching the data
            // You may need to modify the fetchData function in the Table component to do this
            // For example:
            // fetchData(true);
        } catch (error) {
            console.error('Error reprinting errors:', error);
        }
    };

    return (
        <EmployeeLayout
            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >

            <Head title="Production" />
            <h1 className="font-bold text-2xl text-gray-800 mb-8">Production</h1>
            <div className='container'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> {/* Two column layout */}
                    {/* Left Column: Table */}
                    <div className=''>
                        <Table order={order} column={columns} data={'team_name'} onRecordSelect={handleRecordSelect} />
                    </div>
                    {/* Right Column: Error Details */}
                    <div className='bg-white dark:bg-gray-500 rounded-md p-4 shadow-md w-full'>
                        {selectedLineup && (
                            <div>
                                <div className='flex justify-between'>
                                    <h2>Production Details</h2>
                                    {selectedLineup.length !== 0 && (
                                        <PrimaryButton onClick={handleReprintErrors}>Reprint Errors</PrimaryButton>
                                    )}
                                </div>
                                <ul>

                                    {/* Render error details of selected lineup */}
                                    <div className='p-2'>
                                        <p><span className='font-bold'>{selectedRecord.team_name}</span></p>
                                        <p>{selectedRecord.status}</p>
                                        <div className="my-4 relative">
                                            <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                                                <div
                                                    style={{ width: `${selectedRecord.progress}%` }}
                                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                                                ></div>
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">{selectedRecord.progress.toFixed(2)}% Complete</p>
                                        </div>
                                    </div>
                                    <p>Errors</p>
                                    <div className='p-2'>
                                        <table className='w-full'>
                                            <thead className='text-left'>
                                                <th>Name</th>
                                                <th>Details</th>
                                                <th>Note</th>
                                            </thead>
                                            <tbody>
                                                {selectedLineup.length > 0 ? (
                                                    selectedLineup.map((error, index) => (
                                                        <tr key={index}>
                                                            <td className='w-1/4'>{error.player_name}</td>
                                                            <td className='w-1/4'>{error.player_details}</td>
                                                            <td className='w-1/2 font-bold text-teal-500'>{error.note}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="2" className='text-center'>No records found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </ul>
                            </div>
                        )}

                        {!selectedLineup && (
                            <div className='h-full flex justify-center items-center'>
                                <p className=''>Select a team from the table.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </EmployeeLayout>
    );
}
