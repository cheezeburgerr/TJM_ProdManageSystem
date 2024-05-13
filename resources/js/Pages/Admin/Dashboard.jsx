import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { Alert, Progress } from 'flowbite-react';

export default function Dashboard({ auth, boxes, order }) {


    const {props} = usePage();
    let columns = [];



        columns = [
            { title: 'Team', field: 'team_name' },
            { title: 'Apparel', field: 'product_name' },
            { title: 'Due Date', field: 'due_date' },
            { title: 'Status', field: 'status' },

        ];

    console.log(columns);
    return (
        <AdminLayout

            user={auth.admin}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
<Head title="Dashboard" />
            <div className="flex justify-between">
            <h1 className='text-2xl font-bold mb-8 text-gray-50'>Hello {auth.admin.name}!</h1>
            {props.flash.success && (
                <>
                    <div>
                        <Alert>
                            {props.flash.success}
                        </Alert>
                    </div>
                </>
            )}
            </div>


            <InfoBoxes boxes={boxes} />
            <div class="container">
                <div class="md:grid grid-cols-5 grid-flow-col gap-4">
                    <div class="break-inside-avoid-column col-span-3">
                        <Table column={columns} order={order} data={'team_name'}/>
                    </div>
                    <div class="break-inside-avoid-column col-span-2">
                        <div class="p-4 bg-white rounded-md shadow-md text-gray-900">
                            <h1 class="font-semibold ">Production Progress</h1>
                            <div className='p-4'>
                                {order.map(item => (
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



        </AdminLayout>
    );
}
