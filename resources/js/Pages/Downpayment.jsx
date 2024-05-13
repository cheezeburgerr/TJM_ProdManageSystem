import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import PrintTable from '@/Components/PrintTable';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head, useForm } from '@inertiajs/react';
import Axios from 'axios'; // Step 1: Import Axios
import React, { useState } from 'react';

export default function Downpayment({ auth, boxes, order, artists, printers }) {

    const [updatedPrinters, setUpdatedPrinters] = useState(printers);

    const { data, setData, post, processing, errors, reset } = useForm({
        image: '',
    });


    const submitDown = (e) => {
        e.preventDefault();
        console.log(data);

        post(`/downpayment/store/${order.order_id}`, data, {
            forceFormData: true,
        })


        console.log(data);

        // Add logic to handle adding employee
         // Close the modal after adding employee
        // reset();
    };
    console.log(order);
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Downpayment" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='mb-4'>
                        <h1 className="font-bold text-2xl">Set Downpayment </h1>
                    </div>

                        <div className="md:columns-2">
                            {/* Left Column */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-4">
                                <div className="p-6 md:p-12 text-gray-900">

                                    <div className="shadow-sm border-2 rounded-md p-2 mb-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <img src={`/images/products/${order.products.product_image}`} alt="design" className='h-16 rounded-lg' />
                                            </div>
                                            <div className='p-4 text-right'>
                                                <h3 className="font-bold text-xl text-teal-500">Php {order.total_price}.00</h3>
                                                <p className='text-xs'>Php {order.order_price}.00 each</p>
                                                <p className='text-xs'>-50 for Kids</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="font-bold">Order Summary</h3>
                                    <div className="p-2">
                                        <table className='table-auto w-full text-left'>
                                            <thead></thead>
                                            <tbody>
                                                <tr className='mb-4 align-top'>
                                                    <th>Team Name</th>
                                                    <td>{order.team_name}</td>
                                                </tr>
                                                <tr className='mb-4 align-top'>
                                                    <th>Product</th>
                                                    <td>{order.products.product_name}</td>
                                                </tr>
                                                <tr className='mb-4 align-top'>
                                                    <th>Options</th>
                                                    <td>
                                                        {order.attributes.map(option => (
                                                            <p key={option.id}>{option.option_name}</p>
                                                        ))}
                                                    </td>
                                                </tr>
                                                <tr className='mb-4 align-top'>
                                                    <th>Due Date</th>
                                                    <td>{order.due_date}</td>
                                                </tr>
                                                <tr className='mb-4 align-top'>
                                                    <th>Order Price</th>
                                                    <td>Php {order.order_price}</td>
                                                </tr>
                                                <tr className='mb-4 align-top'>
                                                    <th>Total Price</th>
                                                    <td>Php {order.total_price}.00</td>
                                                </tr>
                                                <tr className='mb-4 align-top'>
                                                    <th>Design</th>
                                                    <td><img src={`/images/customers/${order.design}`} alt="design" className='h-48 rounded-lg' /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 md:p-12 text-gray-900">
                                    <h3 className="font-bold">Downpayment</h3>
                                    <div className="text-center mb-4">
                                        <p className='mb-4'>Please pay at least <i><b className='text-teal-500'>Php {order.total_price * 0.45}.00</b></i>.</p>
                                        <p>You can send your downpayment through our GCash account, or bank transfer.</p>
                                    </div>
                                    <div className="mb-4 p-4 text-center">
                                        <p>GCash account number: <b>09XXXXXXXXXX</b></p>
                                    </div>
                                  <form onSubmit={submitDown}>
                                  <div className="mb-4 text-center">
                                        <p>Please upload the screenshot of the transaction.</p>
                                        <input type="file" className='w-full rounded-md border-2' required onChange={(e) => setData('image', e.target.files[0])}/>
                                    </div>
                                    <div className='flex justify-end'>
                                        <PrimaryButton>Submit</PrimaryButton>
                                    </div>
                                  </form>

                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
