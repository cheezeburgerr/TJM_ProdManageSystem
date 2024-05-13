import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import OrderDetails from '@/Components/OrderDetails';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Bag, Brush, Chatbox, Close, Cube, Eye, Hourglass, Pencil, Time } from 'react-ionicons';
import ChatBox from '@/Components/Messages/ChatBox';
import moment from 'moment';
import { usePage } from '@inertiajs/react';
import { Alert } from 'flowbite-react';

export default function Profile({ auth, mustVerifyEmail, status, orders }) {



    const [filteredOrders, setFilteredOrders] = useState(orders);
    const rootUrl = "http://127.0.0.1:8000";
    const [viewIndex, setViewIndex] = useState(null);

    const { props } = usePage();
    const viewOrder = (index) => {
        setViewIndex(index);
    };

    const closeModal = () => {
        setViewIndex(null);
    };

    const countOrdersByStatus = (status) => {
        return orders.filter(order => order.status === status).length;
    };



    const viewOrders = (status) => {
        const filtered = orders.filter(order => order.status === status);
        setFilteredOrders(filtered);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />



            <div className="relative">
                <ChatBox rootUrl={rootUrl} userid={auth.user.id} />

                {props.flash.success && (
                <div className='fixed top-20 right-5 z-50'>
                    <Alert color={'success'}>
                    {props.flash.success}
                    </Alert>
                </div>
                )}
            </div>

            <div className="p-8 md:p-20 flex flex-col md:flex-row justify-center items-center  gap-x-16 bg-teal-500 text-gray-100 text-center w-full">
                <div className='mb-4'>
                    <img src={auth.user.profile_image ? `/images/customers/${auth.user.profile_image}` : '/images/customers/profile.jpg'} alt="" className='h-32 lg:h-48 rounded-full me-2' />

                </div>


                <div className="w-full">
                    <div className='flex justify-center md:justify-start items-center gap-x-4 mb-8'>
                        <h1 className="font-bold text-4xl">{auth.user.name}</h1>
                        <div className="flex space-x-2">
                            <Link href={route('profile.edit')}>
                                <Pencil color={'white'} />
                            </Link>
                        </div>

                    </div>


                    <div className="text-left hidden md:flex gap-x-4 justify-between">

                        <div className="mb-4">
                            <p className='font-xs'>Email</p>
                            <p className='font-bold'>{auth.user.email}</p>
                        </div>
                        <div className="mb-4">
                            <p className='font-xs'>Contact Number</p>
                            <p className='font-bold'>{auth.user.contact_number}</p>
                        </div>
                        <div className="mb-4">
                            <p className='font-xs'>Address</p>
                            <p className='font-bold'>{auth.user.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 ">

                    <div className=' px-4 md:px-8'>
                        <p className="font-bold mb-4">Orders</p>
                        <div className="grid grid-cols-3 gap-8  md:flex gap-x-4 items-start justify-between text-center">
                            <div className='flex flex-col items-center w-full'>

                                <div className="relative cursor-pointer" onClick={() => viewOrders('Pending')}>
                                    {countOrdersByStatus('Pending') !== 0 && (
                                        <p className='absolute bg-teal-500 p-2 rounded-full left-3 -top-3 text-xs text-gray-100 py-1'>{countOrdersByStatus('Pending')}</p>
                                    )}

                                    <Hourglass />
                                </div>

                                <p>Pending</p>
                            </div>
                            <div className='flex flex-col items-center w-full' onClick={() => viewOrders('Designing')}>
                                <div className="relative cursor-pointer">
                                    {countOrdersByStatus('Designing') !== 0 && (
                                        <p className='absolute bg-teal-500 p-2 rounded-full left-3 -top-3 text-xs text-gray-100 py-1'>{countOrdersByStatus('Designing')}</p>
                                    )}
                                    <Brush />
                                </div>
                                <p>Designing</p>

                            </div>
                            <div className='flex flex-col items-center w-full' onClick={() => viewOrders('Printing')}>
                                <div className="relative cursor-pointer">
                                    {countOrdersByStatus('Printing') !== 0 && (
                                        <p className='absolute bg-teal-500 p-2 rounded-full left-3 -top-3 text-xs text-gray-100 py-1'>{countOrdersByStatus('Printing')}</p>
                                    )}
                                    <Time />
                                </div>
                                <p className='truncate'>In Production</p>
                            </div>
                            <div className='flex flex-col items-center w-full' onClick={() => viewOrders('Finished')}>
                                <div className="relative cursor-pointer">
                                    {countOrdersByStatus('Finished') !== 0 && (
                                        <p className='absolute bg-teal-500 p-2 rounded-full left-3 -top-3 text-xs text-gray-100 py-1'>{countOrdersByStatus('Finished')}</p>
                                    )}
                                    <Bag />
                                </div>
                                <p className='truncate'>To Pickup</p>
                            </div>
                            <div className='flex flex-col items-center w-full' onClick={() => viewOrders('Received')}>
                                <div className="relative cursor-pointer">
                                    {countOrdersByStatus('Received') !== 0 && (
                                        <p className='absolute bg-teal-500 p-2 rounded-full left-3 -top-3 text-xs text-gray-100 py-1'>{countOrdersByStatus('Received')}</p>
                                    )}
                                    <Cube />
                                </div>
                                <p>Received</p>
                            </div>
                            <div className='flex flex-col items-center w-full' onClick={() => viewOrders('Cancelled')}>
                                <div className="relative cursor-pointer">
                                    {countOrdersByStatus('Cancelled') !== 0 && (
                                        <p className='absolute bg-teal-500 p-2 rounded-full left-3 -top-3 text-xs text-gray-100 py-1'>{countOrdersByStatus('Cancelled')}</p>
                                    )}
                                    <Close />
                                </div>
                                <p>Cancelled</p>
                            </div>

                        </div>
                    </div>
                    <div className="col-span-2 w-full p-8">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg">
                            <h3 className='font-bold'>Your Orders</h3>
                            <hr />
                            <div>
                                {filteredOrders.map((order, index) => (
                                    <div key={order.id} >
                                        <div className='flex justify-between mb-4 p-4 gap-x-4 items-center'>
                                            <div className='bg-cover h-16 w-20 rounded-lg' style={{ backgroundImage: `url(/images/customers/${order.design})` }}>
                                            </div>
                                            <div className="w-full">
                                                <p className='font-bold text-teal-500 text-lg'>{order.team_name}</p>
                                                <p className='font-bold text-sm'>{order.product_name}</p>
                                                <p className='text-sm'>{moment(order.due_date).format('MMMM Do YYYY')}</p>
                                            </div>
                                            <div className='text-right'>
                                                <p className=' text-gray-100 px-2 bg-gray-900 rounded-full'>{order.status}</p>


                                                <div className="flex gap-x-2 justify-end">
                                                    <Link href={`/view_order/${order.order_id}`}>
                                                        <Eye />
                                                    </Link>


                                                    {['Pending', 'Designing', 'Approved'].includes(order.status) && (
                                                        <Link href={`/order/${order.order_id}/edit`}>
                                                            <Pencil />
                                                        </Link>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {viewIndex !== null && (
                <Modal show={true} onClose={closeModal}>
                    <OrderDetails edit={true} order={orders[viewIndex]} />
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
