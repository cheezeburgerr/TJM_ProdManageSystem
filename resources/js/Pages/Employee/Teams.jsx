import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Teams({ auth, boxes, order, artists, printers }) {

    console.log(auth.employee);
    const [tab, setTab] = useState('myTeams');

    const columns = [
        { title: 'Team', field: 'team_name' },
        { title: 'Apparel', field: 'product_name' },
        { title: 'Due Date', field: 'due_date' },
        { title: 'Status', field: 'status' }
    ];

    if (auth.user.department_id === 2) {
        columns.push({ title: 'Artist', field: 'first_name' });
    }
    if (auth.user.department_id === 4) {
        columns.push({ title: 'Artist', field: 'first_name' });
        columns.push({ title: 'Printer', field: 'equipment_name' });
        columns.push({ title: 'Progress', field: 'progress' });
    }

    const handleTabChange = (tabName) => {
        setTab(tabName);
    };

    return (
        <EmployeeLayout
            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Teams" />
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-4">Teams</h1>
                    {(auth.employee.department_id === 1 && auth.employee.is_supervisor) && (
                        <ul className="inline-flex justify-start p-2 bg-white rounded-md text-xs uppercase tracking-wide uppercase font-semibold">
                            <li className="mr-1">
                                <button onClick={() => handleTabChange('myTeams')} className={`p-2 rounded-md ${tab === 'myTeams' ? 'bg-teal-500 text-white' : ''}`}>
                                    My Teams List
                                </button>
                            </li>
                            <li className="mr-1">
                                <button onClick={() => handleTabChange('teamsWithoutArtist')} className={`p-2 rounded-md ${tab === 'teamsWithoutArtist' ? 'bg-teal-500 text-white' : ''}`}>
                                    Teams Without Artist
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                {tab === 'myTeams' && (
                    <div className="mb-4">
                        <Table column={columns} order={order} data={'team_name'} fetchData={false} emp={auth.employee.department_id} artists={artists} printers={printers} />
                    </div>
                )}

                {tab === 'teamsWithoutArtist' && (
                    (auth.employee.department_id === 1 && auth.employee.is_supervisor) && (
                        <div>
                            <Table column={columns} order={order} data={'team_name'} fetchData={true} emp={auth.employee.department_id} artists={artists} printers={printers} />
                        </div>
                    )
                )}


            </div>
        </EmployeeLayout>
    );
}
