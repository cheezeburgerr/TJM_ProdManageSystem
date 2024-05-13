import React, { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import { CloseOutline } from 'react-ionicons';

export default function Lineup({ auth, order, order_id }) {
    const [rows, setRows] = useState([{ id: 0 }]);

    const addRow = () => {
        setRows(prevRows => [...prevRows, { id: prevRows.length }]);
    };

    const removeRow = (id) => {
        setRows(prevRows => prevRows.filter(row => row.id !== id));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            const response = await axios.post(`/lineup/submit/${order_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            }).then(response => {

                console.log('Record updated successfully:', response.data);
                window.location.href = `/downpayment/${order_id}`

            });
            // Handle success response

            console.log(response.data);
        } catch (error) {
            // Handle error
            console.error('Error:', error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Lineup" />
            <div className="py-12 text-gray-900">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className=" font-semibold mb-3 tracking-wide">
                    <h1 className="text-4xl text-center md:text-left ">{order.team_name}</h1>
                </div>

                <form className="relative overflow-x-auto  sm:rounded-lg" onSubmit={handleSubmit}>
                    <div className="mb-3 sticky top-15 bg-light p-3">
                        <div className="row">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs">{order.products.product_name}</p>
                                    <p className="text-xs">{order.due_date}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <SecondaryButton onClick={addRow} className="btn btn-dark btn-sm">Add Row</SecondaryButton>
                                    <PrimaryButton type="submit" className="btn btn-primary">Submit</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row scrollable card p-3">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead>
                                <tr>
                                    <th className="">Name</th>
                                    <th>Number/Position</th>
                                    <th className="">Classification</th>
                                    <th>Gender</th>
                                    <th>Upper Size</th>
                                    <th>Short Size</th>
                                    <th>Short Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(row => (
                                    <tr key={row.id}>
                                        <td data-label="Name">
                                            <TextInput className="w-full md:w-48" type="text" name={`input[${row.id}][player_name]`} placeholder="Name" required />
                                        </td>
                                        <td data-label="Number">
                                            <TextInput className="w-full md:w-36" type="text" name={`input[${row.id}][player_details]`} placeholder="Number" />
                                        </td>
                                        <td data-label="Classification">
                                            <select className="w-full md:w-36 border-gray-300 rounded-md" name={`input[${row.id}][classification]`} required>
                                                <option value="" disabled>Select Classification</option>
                                                <option value="Adult">Adult</option>
                                                <option value="Kid">Kid</option>
                                            </select>
                                        </td>
                                        <td data-label="Gender">
                                            <select className="w-full md:w-36 border-gray-300 rounded-md" name={`input[${row.id}][gender]`} required>
                                                <option value="" disabled>Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </td>
                                        <td data-label="Upper Size">
                                            <TextInput className="w-full md:w-36" type="text" name={`input[${row.id}][upper_size]`} placeholder="Upper Size" />
                                        </td>
                                        <td data-label="Short Size">
                                            <TextInput className="w-full md:w-36" type="text" name={`input[${row.id}][short_size]`} placeholder="Short Size" />
                                        </td>
                                        <td data-label="Short Name">
                                            <TextInput className="w-full md:w-36" type="text" name={`input[${row.id}][short_name]`} placeholder="" />
                                        </td>
                                        <td>
                                            {/* <button type="button" onClick={() => removeRow(row.id)} className="btn btn-dark btn-sm">Remove</button> */}
                                            <CloseOutline onClick={() => removeRow(row.id)} className='cursor-pointer'></CloseOutline>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}
