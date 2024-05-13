import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function FinalChecking({ auth, boxes, order, artists, printers }) {

    console.log(auth.employee);
    const [tab, setTab] = useState('myTeams');

    const columns = [
        { title: 'Team', field: 'team_name' },
        { title: 'Apparel', field: 'product_name' },
        { title: 'Due Date', field: 'due_date' },
        { title: 'Status', field: 'status' }
    ];

    if (auth.employee.department_id === 2) {
        columns.push({ title: 'Artist', field: 'first_name' });
    }
    if (auth.employee.department_id === 4) {
        columns.push({ title: 'Artist', field: 'first_name' });
        columns.push({ title: 'Printer', field: 'equipment_name' });
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
                    <h1 className="text-2xl font-bold mb-4">Final Checking</h1>

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
