import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, boxes, order }) {

    const emp = auth.employee.department_id;
    let columns = [];

        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Apparel', field: 'product_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },
        ];


    console.log(columns);
    return (
        <EmployeeLayout

            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >

<Head title="Pending Teams" />
            <h1 className='text-2xl font-bold mb-4 text-gray-800'>Pending Teams</h1>



            <div class="container">
                <div>
                <Table column={columns} order={order} data={'team_name'} emp={emp}/>
                </div>
            </div>



        </EmployeeLayout>
    );
}
