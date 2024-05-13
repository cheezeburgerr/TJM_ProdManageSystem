import React, { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Reprints({ auth, boxes, order }) {
    const [checkedLineups, setCheckedLineups] = useState({});

    const handleCheckboxChange = async (lineupId) => {
        // Toggle the checked status in the state
        setCheckedLineups(prevState => ({
            ...prevState,
            [lineupId]: !prevState[lineupId]
        }));

        // Call the handleUpdateStatus function immediately
        try {
            await handleUpdateStatus(lineupId, 'Printed');
        } catch (error) {
            console.error('Error updating printed status:', error);
        }
    };

    const handleUpdateStatus = async (lineupId, printedStatus) => {
        try {
            await axios.put(`/api/update_check/${lineupId}`, {
                orderId: order.order_id,
                prodId: order.production_details_id,
                lineupId: lineupId,
                printed: printedStatus,
            });
            console.log('Printed status updated successfully.');
        } catch (error) {
            console.error('Error updating printed status:', error);
            // Reset the checkbox state if update fails
            setCheckedLineups(prevState => ({
                ...prevState,
                [lineupId]: !prevState[lineupId]
            }));
        }
    };

    return (
        <EmployeeLayout
            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Reprints" />
            <h1 className="font-bold text-2xl mb-4 text-gray-800">Reprints</h1>
            <div className='p-4'>
                {order && order.map(orderItem => (
                    <div key={orderItem.order_id}>
                        <div className="w-full bg-gray-200 p-2 rounded-md mb-2">
                            <p>{orderItem.team_name}</p>
                        </div>
                        <table className='w-full table-auto'>
                            <thead className='text-xs uppercase font-bold'>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Player Details</th>
                                    <th>Gender</th>
                                    <th>Upper Size</th>
                                    <th>Short Size</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItem.lineups && orderItem.lineups.map(lineup => (
                                    lineup.status !== 'Error' && (
                                        <tr key={lineup.id} className='text-gray-700 text-sm'>
                                            <td className='p-2'>{lineup.player_name}</td>
                                            <td>{lineup.player_details}</td>
                                            <td>{lineup.gender}</td>
                                            <td>{lineup.upper_size}</td>
                                            <td>{lineup.short_size}</td>
                                            <td>{lineup.status}</td>
                                            <td>
                                                <Checkbox
                                                    checked={checkedLineups[lineup.id]}
                                                    onChange={() => handleCheckboxChange(lineup.id)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </EmployeeLayout>
    );
}
