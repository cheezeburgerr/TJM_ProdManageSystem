import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Teams({ auth, boxes, order, artists, printers }) {

    console.log(auth.admin);
    const [tab, setTab] = useState('myTeams');

    const columns = [
        { title: 'Team', field: 'team_name' },
        { title: 'Apparel', field: 'product_name' },
        { title: 'Due Date', field: 'due_date' },
        { title: 'Status', field: 'status' },
        { title: 'Artist', field: 'first_name' },
        { title: 'Printer', field: 'equipment_name' },
    ];



    const handleTabChange = (tabName) => {
        setTab(tabName);
    };

    return (
        <AdminLayout
            user={auth.admin}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Teams" />
            <div>
                <div className="flex justify-between items-center mb-4 text-gray-900">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">Teams</h1>

                </div>

                {tab === 'myTeams' && (
                    <div className="mb-4">
                        <Table column={columns} order={order} data={'team_name'} fetchData={false} emp={auth.admin} artists={artists} printers={printers} />
                    </div>
                )}


            </div>
        </AdminLayout>
    );
}
