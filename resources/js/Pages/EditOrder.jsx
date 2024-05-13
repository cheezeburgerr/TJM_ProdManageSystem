import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Radio from '@/Components/Radio';

export default function EditOrder({ auth, orderId, order, products }) {
    const [teamName, setTeamName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState('');
    const [options, setOptions] = useState(order.attributes);

    const [optionPrices, setOptionPrices] = useState({});
    const [orderPrice, setOrderPrice] = useState('');
    useEffect(() => {
        // Set initial values from order
        setTeamName(order.team_name);
        setDueDate(order.due_date);

        console.log(selectedOptions)
    }, [order]);

    const handleInputChange = (e) => {
      const { name, value, dataset } = e.target;
        let newSelectedOptions = { ...selectedOptions };

        if (name === 'team_name') {
            setTeamName(value);
        } else if (name === 'due_date') {
            setDueDate(value);
        } else {
            newSelectedOptions[name] = value;
        }

        setSelectedOptions(newSelectedOptions);
        calculateTotalPrice(newSelectedOptions);
    };


    useEffect(() => {
        // Initialize option prices
        console.log(products);
        const prices = {};
        products.attributes.forEach(attribute => {
            attribute.options.forEach(option => {
                prices[option.id] = parseFloat(option.option_price);
            });
        });
        setOptionPrices(prices);
    }, [products]);



    const calculateTotalPrice = (options) => {
        let totalPrice = parseFloat(products.product_price);
        for (const [key, value] of Object.entries(options)) {
            totalPrice += parseFloat(optionPrices[value]);
        }
        document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
        setOrderPrice(totalPrice.toFixed(2));
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
        formData.append('order_price', orderPrice);

        // Add selected options to FormData
        for (const [key, value] of Object.entries(selectedOptions)) {
            formData.append(key, value);
        }

        try {
            const response = await axios.post(`/api/order/update/${order.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Redirect to other routes after successful submission
            window.location.href = `/profile-show`;
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
                    <div className='mb-4'>
                        <h1 className="font-bold text-2xl font-Bebas">Edit Order</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="md:flex items-start gap-x-4">
                            {/* Left Column */}
                            <div className='md:w-2/5 bg-white p-4 lg:sticky w-full top-36'>
                                <p className='font-bold mb-4'>{order.products.product_name}</p>
                                <img className='hidden md:block' src={`/images/customers/${order.design}`} />
                            </div>
                            {/* Right Column */}
                            <div className="bg-white overflow-hidden shadow-sm">
                                <div className="p-6 md:p-12 text-gray-900">
                                    <div className="mb-4 text-gray-900 md:flex gap-x-4">
                                        {/* Team Name */}
                                        <div className='w-full'>
                                            <InputLabel htmlFor="team_name" className="block mb-2 text-sm font-medium text-gray-900">Team Name</InputLabel>
                                            <TextInput type="text" id="team_name" name="team_name" value={teamName} onChange={handleInputChange} className="mt-1 block w-full" />
                                        </div>
                                        {/* Due Date */}
                                        <div className='w-full'>
                                            <InputLabel htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900">Due Date</InputLabel>
                                            <TextInput type="date" id="due_date" name="due_date" value={dueDate} onChange={handleInputChange} className="mt-1 block w-full" />
                                        </div>
                                        {/* Design */}
                                        <div className='w-full'>
                                            <InputLabel htmlFor="design" className="block mb-2 text-sm font-medium text-gray-900">Design</InputLabel>
                                            <input type="file" id="design" name="design" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                                        </div>
                                    </div>
                                    {/* Attributes and Options */}
                                    <div className="flex flex-wrap gap-x-4">
                                        {order.products.attributes.map((attribute) => (
                                            <div key={attribute.id} className='mb-3 w-full'>
                                                <InputLabel htmlFor={attribute.attribute_name} className="block mb-2 text-sm font-medium text-gray-900">{attribute.attribute_name}</InputLabel>
                                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                                    {attribute.options.map((option) => (
                                                        <li key={option.id} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r p-1 px-3 flex items-center">
                                                            <Radio type="radio" id={option.option_name} name={attribute.id} value={option.id} onChange={handleInputChange} data-price={option.option_price} required />
                                                            <InputLabel htmlFor={option.option_name} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{option.option_name}</InputLabel>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Total Price */}
                                    <hr />
                                    <div className="flex flex-col items-end mt-4">
                                        <div className="text-s">Php<span id="totalPrice" className="text-2xl font-bold">{order.order_price}.00</span> each</div>
                                        <PrimaryButton type="submit" className='rounded-none'>Submit</PrimaryButton>
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
