import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, boxes, order }) {

    let columns = [];

    console.log(auth.employee);
    if (auth.employee.department_id === 1) {
        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Apparel', field: 'product_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },
            { title: 'Progress', field: 'progress' }
        ];
    } else if (auth.employee.department_id === 2) {
        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Apparel', field: 'product_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },
            { title: 'Artist', field: 'first_name' }
        ];
    } else {
        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },
            { title: 'Progress', field: 'progress' }
        ];
    }

    console.log(columns);
    return (
        <EmployeeLayout

            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
<Head title="Dashboard" />
            <h1 className='text-2xl font-bold mb-4'>Hello {auth.employee.first_name}!</h1>


            <InfoBoxes boxes={boxes} />
            <div class="container">
                <div class="md:grid grid-cols-5 grid-flow-col gap-4">
                    <div class="break-inside-avoid-column col-span-3">
                        <Table column={columns} order={order} data={'team_name'}/>
                    </div>
                    <div class="break-inside-avoid-column col-span-2">
                        <div class="p-4 bg-white rounded-md shadow-md">
                            <h1 class="font-semibold ">Team Details</h1>
                        </div>
                    </div>
                </div>
            </div>



        </EmployeeLayout>
    );
}