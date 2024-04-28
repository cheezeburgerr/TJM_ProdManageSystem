import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import { Progress } from 'flowbite-react';

export default function Dashboard({ auth, boxes, order }) {

    let columns = [];

    console.log(auth.admin);

        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Apparel', field: 'product_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },

        ];

    console.log(columns);
    return (
        <EmployeeLayout

            user={auth.admin}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
<Head title="Dashboard" />
            <h1 className='text-2xl font-bold mb-4'>Hello {auth.admin.name}!</h1>


            <InfoBoxes boxes={boxes} />
            <div class="container">
                <div class="md:grid grid-cols-5 grid-flow-col gap-4">
                    <div class="break-inside-avoid-column col-span-3">
                        <Table column={columns} order={order} data={'team_name'}/>
                    </div>
                    <div class="break-inside-avoid-column col-span-2">
                        <div class="p-4 bg-white rounded-md shadow-md">
                            <h1 class="font-semibold ">Production Progress</h1>
                            <div className='p-4'>
                                {order.map(item => (
                                    <>
                                        <div className="mb-4">
                                        <p>{item.team_name}</p>

                                        <Progress progress={item.progress} size={'md'} color='teal'/>
                                        <div className='flex justify-between mt-1'>
                                        <p>{item.status}</p>
                                        <p>{item.progress}%</p>
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
