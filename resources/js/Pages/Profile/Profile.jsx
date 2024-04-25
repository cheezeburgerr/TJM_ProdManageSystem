import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import OrderDetails from '@/Components/OrderDetails';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Profile({ auth, mustVerifyEmail, status, orders }) {
    const [viewIndex, setViewIndex] = useState(null);

    const viewOrder = (index) => {
        setViewIndex(index);
    };

    const closeModal = () => {
        setViewIndex(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 md:flex justify-start items-start gap-4">
                    <div className="p-4 sm:p-8 flex flex-col justify-center items-center md:sticky top-16">
                        <div>
                            <img src="./images/customers/profile.jpg" alt="" className='rounded-full h-36 mb-2' />
                        </div>
                        <h1 className="font-bold text-lg">{auth.user.name}</h1>
                        <div className="flex space-x-2">
                            <Link href={route('profile.edit')}>
                                <PrimaryButton>Edit Profile</PrimaryButton>
                            </Link>
                        </div>
                        <div className="text-left w-full">
                            <br />
                            <hr className='mb-4' />
                            <h3>Information</h3>
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

                    <div className="break-inside-avoid-column col-span-2 w-full">
                        <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <h3>Recent Orders</h3>
                            <hr />
                            <div>
                                {orders.map((order, index) => (
                                    <div key={order.id} >
                                        <div className='flex justify-between mb-4 p-4'>
                                            <div className="">
                                                <p className='font-bold'>{order.team_name}</p>
                                                <p >{order.product_name}</p>
                                                <p >{order.due_date}</p>
                                            </div>
                                            <div className='text-right'>
                                                <p className='italic text-teal-500'>{order.status}</p>


                                            <PrimaryButton onClick={() => viewOrder(index)} className='font-bold   uppercase text-xs me-1'>View</PrimaryButton>

                                            <Link href={`/order/${order.order_id}/edit`}>
                    <PrimaryButton>Edit</PrimaryButton>
                    </Link>

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
                    <OrderDetails edit={true} order={orders[viewIndex]}/>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
