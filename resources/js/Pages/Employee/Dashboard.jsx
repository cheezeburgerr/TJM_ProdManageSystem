import InfoBoxes from '@/Components/InfoBoxes';
import ChatBox from '@/Components/Messages/ChatBox';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head, usePage } from '@inertiajs/react';
import { Progress } from 'flowbite-react';

export default function Dashboard({ auth, boxes, order, production }) {

    let columns = [];

    const { props } = usePage();
    console.log(auth.employee);
    if (auth.employee.department_id === 1) {
        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Apparel', field: 'product_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },

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

        ];
    }

    console.log(columns);
    return (
        <EmployeeLayout

            user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >

            <Head title="Dashboard" />

            <h1 className='text-2xl font-bold mb-8 text-gray-100'>Hello {auth.employee.first_name}!</h1>

            {props.flash.success && (
                        <>

                            <Alert color="success" className='bg-teal-500 text-gray-100'>
                                <span>{props.flash.success}</span>
                            </Alert>

                        </>
                    )}


<ChatBox rootUrl={'http://127.0.0.1:8000'} userid={auth.employee.employee_id}/>
            <InfoBoxes boxes={boxes} />
            <div class="container">
                <div class="md:grid grid-cols-5 grid-flow-col gap-4">
                    <div class="break-inside-avoid-column col-span-3">
                        <Table column={columns} order={order} data={'team_name'} />
                    </div>
                    <div class="break-inside-avoid-column col-span-2 text-gray-800z">
                        <div class="p-4 bg-white rounded-md shadow-md">
                            <h1 class="font-semibold ">Production Progress</h1>
                            <div className='p-4'>
                            {production.map(item => (
                                    <>
                                        <div className="mb-4">
                                        <p className='font-bold'>{item.team_name}</p>

                                        <Progress progress={item.progress} size={'md'} color='teal'/>
                                        <div className='flex justify-between mt-1'>
                                        <p className=''>{item.status}</p>
                                        <p className='text-teal-500 font-bold'>{item.progress}%</p>
                                        </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </EmployeeLayout>
    );
}
