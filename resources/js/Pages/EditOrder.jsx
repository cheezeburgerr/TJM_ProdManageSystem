import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';

export default function EditOrder({ auth, orderId, order }) {
    const [teamName, setTeamName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [products, setProducts] = useState(null);

    useEffect(() => {
        // Set initial values from order
        setTeamName(order.team_name);
        setDueDate(order.due_date);
    }, [order]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'team_name') {
            setTeamName(value);
        } else if (name === 'due_date') {
            setDueDate(value);
        } else {
            // If it's a radio input, update selectedOptions accordingly
            setSelectedOptions({ ...selectedOptions, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('team_name', teamName);
        formData.append('due_date', dueDate);
        formData.append('image', selectedFile);

        // Add selected options to FormData
        for (const [key, value] of Object.entries(selectedOptions)) {
            formData.append(key, value);
        }

        try {
            const response = await axios.post(`/api/order/update/${order.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                // obtain the data return from controller
                const { id } = response.data;

                //perform your redirection to other routes.
                window.location.href = `/profile-show`;
             });
            console.log(response.data);
            // Add your success handling code here
        } catch (error) {
            console.error('Error:', error);
            // Add your error handling code here
        }
    };


    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Order</h2>}>
            <Head title="Edit Order" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="md:columns-2">
                            {/* Left Column */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 md:p-12 text-gray-900">
                                    {/* Team Name */}
                                    <div>
                                        <InputLabel htmlFor="team_name" className="block mb-2 text-sm font-medium text-gray-900">Team Name</InputLabel>
                                        <TextInput type="text" id="team_name" name="team_name" value={teamName} onChange={handleInputChange} className="mt-1 block w-full" />
                                    </div>
                                    {/* Due Date */}
                                    <div>
                                        <InputLabel htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900">Due Date</InputLabel>
                                        <TextInput type="date" id="due_date" name="due_date" value={dueDate} onChange={handleInputChange} className="mt-1 block w-full" />
                                    </div>
                                    {/* Design */}
                                    <div>
                                        <InputLabel htmlFor="design" className="block mb-2 text-sm font-medium text-gray-900">Design</InputLabel>
                                        <TextInput type="file" id="design" name="design" onChange={handleFileChange} className="mt-1 block w-full" />
                                        <img src={`/images/customers/${order.design}`} alt="design" className='h-48 rounded-lg' />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 md:p-12 text-gray-900">
                                    {/* Apparel */}
                                    <div>
                                        <InputLabel htmlFor="product_id" className="block mb-2 text-sm font-medium text-gray-900">Apparel</InputLabel>
                                        <TextInput type="text" id="product_id" name="product_id" value={order.product_id} readOnly data-price={order.product_price} className="mt-1 block w-full" />
                                    </div>
                                    {/* Attributes and Options */}
                                    {order.products.attributes.map((attribute) => (
                                        <div key={attribute.id}>
                                            <InputLabel htmlFor={attribute.attribute_name} className="block mb-2 text-sm font-medium text-gray-900">{attribute.attribute_name}</InputLabel>
                                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                                {attribute.options.map((option) => (
                                                    <li key={option.id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r p-1 px-3 flex items-center">
                                                        <TextInput
                                                            type="radio"
                                                            id={option.option_name}
                                                            name={attribute.attribute_name}
                                                            value={option.id}
                                                            onChange={handleInputChange}
                                                            data-price={option.option_price}
                                                            // checked={selectedOptions[attribute.id] === option.id || order.attributes.some(attr => attr.id === option.id && attr.pivot.option_id === option.id)} // Check if the option is selected in the order attributes
                                                            required
                                                        />
                                                        <InputLabel htmlFor={option.option_name} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{option.option_name}</InputLabel>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                    {/* Add logic to display and handle attributes and options */}
                                    {/* Total Price */}
                                    <div className="flex justify-between">
                                        <div className="text-s">Php<span id="totalPrice" className="text-2xl font-bold">0.00</span>each</div>
                                        <PrimaryButton type="submit">Submit</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
