import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import PrintTable from '@/Components/PrintTable';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import Modal from '@/Components/Modal';
import ReturnRecords from '@/Components/ReturnRecords';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { router } from '@inertiajs/react';
import { Alert } from 'flowbite-react';

export default function Check({ auth, boxes, order, artists, printers }) {

    const [message, setMessage] = useState('');
    const [values, setValues] = useState({
        status: "Finished",
    })

    useEffect(() => {
        // Get success message from local storage
        const successMessage = localStorage.getItem('successMessage');

        // Set message state if successMessage exists
        if (successMessage) {
            setMessage(successMessage);

            // Clear success message from local storage
            localStorage.removeItem('successMessage');
        }
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [uncheckedRecords, setUncheckedRecords] = useState([]);
    const column = [
        { title: 'Name', field: 'player_name' },
        { title: 'Details', field: 'player_details' },
        { title: 'Classification', field: 'classification' },
        { title: 'Gender', field: 'gender' },
        { title: 'Upper Size', field: 'upper_size' },
        { title: 'Short Size', field: 'short_size' },
        { title: 'Short Name', field: 'short_name' },
        { title: 'Status', field: 'status' },
        { title: 'Note', field: 'note' },
        // Add more columns as needed
    ];
    const [lineup, setLineup] = useState([]);

    const data = 'player_name';
    const [searchTerm, setSearchTerm] = useState("");
    const [printingStarted, setPrintingStarted] = useState(true);
    const fetchLineup = async () => {
        try {
            const response = await axios.get(`/api/get-lineup/${order.order_id}`);
            const filterResponse = response.data.filter(order => order.status === 'Printed');
            setLineup(response.data);
        } catch (error) {
            console.error('Error fetching lineup:', error);
        }
    }

    function changeStatus(e) {

        e.preventDefault()
        router.post(`/employee/change_status/${order.production_details_id}`, {
            status: 'Finished',
            message: 'Order Production Completed'
        })

    }

    useEffect(() => {
        fetchLineup();
    }, [])


    const handleFinishButtonClick = () => {

        const unchecked = lineup.filter(item => item.status !== 'Finished');
        setUncheckedRecords(unchecked);
        setShowModal(true); // Show the modal
    };

    const handleCheckboxChange = async (index) => {
        if (!printingStarted) return;

        const updatedLineup = [...lineup]; // Create a copy of the lineup array
        const currentItem = updatedLineup[index]; // Get the current item

        // Update the status of the current item
        currentItem.status = currentItem.status === 'Finished' ? 'Sewing' : 'Finished';

        // Update the lineup state with the modified item
        setLineup(updatedLineup);

        // Send the updated status to the server if needed
        try {
            await axios.put(`/api/update_check/${currentItem.id}`, {
                orderId: order.order_id,
                prodId: order.production_details_id,
                lineupId: currentItem.player_id,
                printed: currentItem.status,
            });
            console.log('Printed status updated successfully.');
        } catch (error) {
            console.error('Error updating printed status:', error);
        }
    };

    return (
        <EmployeeLayout
            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Check Data" />
            <div className="flex justify-between">
            <h1 className="font-bold text-2xl text-gray-900 mb-8">Final Check Lineups</h1>
            {message && (
                <>
                    <Alert color={'success'}>
                        <p>{message}</p>
                    </Alert>
                </>
            )}
            </div>

            <div className="columns-2 bg-white p-4 rounded-md shadow-md mb-4">

                <div className="break-inside-avoid-column">
                    <div>
                        <p>Team: <span className="font-bold">{order.team_name}</span></p>
                        <p>Apparel: <span className="font-bold">{order.product_name}</span></p>
                        <p>Due Date: <span className="font-bold">{new Date(order.due_date).toLocaleDateString()}</span></p>
                    </div>
                </div>
                <div className="break-inside-avoid-column">
                    <div className="flex items-center space-x-2 mb-4 justify-end">
                        <DangerButton onClick={handleFinishButtonClick}>Return Errors</DangerButton>
                        <PrimaryButton onClick={changeStatus}>Release</PrimaryButton>
                    </div>
                    <div className="my-4 relative">
                        {/* <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                                <div
                                    style={{ width: `${progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500"
                                ></div>
                            </div> */}
                        {/* <p className="mt-2 text-sm text-gray-500">{progress.toFixed(2)}% Complete</p> */}
                    </div>
                </div>
            </div>

            <div className="relative  shadow-md sm:rounded-lg">
                <div className="flex justify-between w-full p-4 bg-white">
                    <div>Lineup</div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                </div>
                <div className="overflow-x-auto">
                    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            {column.map((item, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    key={index}
                                >
                                    {item.title}
                                </th>
                            ))}
                            <th scope="col" className="px-6 py-3 cursor-pointer">Checked</th>
                        </thead>
                        <tbody>
                            {Array.isArray(lineup) && lineup.length === 0 ? (
                                <tr>
                                    <td colSpan={column.length + 1} className="px-6 py-4 text-center bg-white text-md">
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                lineup.filter((item) => {
                                    if (!data || searchTerm === "") {
                                        return true;
                                    } else if (
                                        item[data]?.toLowerCase().includes(searchTerm.toLowerCase())
                                    ) {
                                        return true;
                                    }
                                    return false;
                                })
                                    .map((item, index) => (
                                        <tr
                                            className={`border-b dark:border-gray-700 ${!printingStarted && item.status !== 'Printed' ? 'bg-red-200' : (index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900')}`}

                                            key={index}
                                        >
                                            {column.map((col, colIndex) => (
                                                <td className="px-6 py-4" key={colIndex}>
                                                    <p>{item[col.field]}</p>
                                                </td>
                                            ))}
                                            <td className="px-6 py-4">
                                                <Checkbox
                                                    type="checkbox"
                                                    checked={item.status === 'Finished'}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <ReturnRecords uncheckedRecords={uncheckedRecords}/>
                </Modal>
            )}

        </EmployeeLayout>
    );
}
