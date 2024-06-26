import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import PrintTable from '@/Components/PrintTable';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head, useForm } from '@inertiajs/react';
import Axios from 'axios'; // Step 1: Import Axios
import React, { useState } from 'react';
import { Tabs } from 'flowbite-react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Printers({ auth, boxes, gallery, products, printers }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        image: '',
        product_id: '',
        description: ''

    });

    const [addModal, setShowAdd] = useState(false);
    const filterGallery = (product) => {
        return gallery.filter(gal => gal.product_id === product);
    };

    const addGallery = () => {
        setShowAdd(true);
    }

    const closeAdd = () => {
        setShowAdd(false);
    }

    const addPicture = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('add.picture'), data, {
            forceFormData: true,
        })


        console.log(data);

        // Add logic to handle adding employee
        setShowAdd(false); // Close the modal after adding employee
        reset();
    };
    return (
        <EmployeeLayout user={auth.employee} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Printers" />
            <h1 className="font-bold text-2xl mb-8 text-gray-800">Gallery</h1>
            <PrimaryButton onClick={() => addGallery()} className='mb-4'>Add</PrimaryButton>
            <div>

                    <div className="lg:grid grid-cols-4 gap-4">
                    {gallery.map((product, index) => (
                        <div key={index} className='rounded-md cursor-pointer mb-4' onClick={() => openModal(product)}>
                            <img
                                src={`/images/gallery/${product.image}`}
                                alt={product.name}
                                className="h-56 w-full object-cover rounded-t-md"
                            />
                            <div className="bg-white p-4 rounded-b-md">
                                <p className='font-bold'>{product.name}</p>

                            </div>
                        </div>
                    ))}
                    </div>

            </div>

            <Modal show={addModal} onClose={closeAdd} maxWidth='3xl'>
                <>
                    <div className='p-4'>
                        <h1 className='font-bold text-2xl mb-4'>Add Picture to Gallery</h1>
                        <form onSubmit={addPicture}>
                        <div className='mb-4 w-full'>
                                <InputLabel>Name</InputLabel>
                                <TextInput type="text" name="name" required onChange={(e) => setData('name', e.target.value)} value={data.name} className='w-full'/>
                            </div>
                            <div className="flex grap-x-4 mb-4">

                            <div className='mb-4 w-full me-4'>
                                <InputLabel>Image</InputLabel>
                                <input type="file" id="image" name="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" required onChange={(e) => setData('image', e.target.files[0])} />
                            </div>
                            <div className='mb-4 w-full'>
                                <InputLabel>Product</InputLabel>
                                <select
                                required
                                onChange={(e) => setData('product_id', e.target.value)} value={data.product_id}
                                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                >
                                    <option value="All">All Departments</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.product_name}</option>
                                    ))}
                                </select>
                            </div>
                            </div>
                            <div className='mb-4'>
                                <InputLabel>Description</InputLabel>
                                <textarea type="text" name="description" className="w-full focus:ring-teal-500 rounded-md" onChange={(e) => setData('description', e.target.value)} value={data.description} required/>
                            </div>

                            <div className="mb-4 flex justify-end">
                                <PrimaryButton>Add</PrimaryButton>
                            </div>

                        </form>
                    </div>
                </>
            </Modal>
        </EmployeeLayout>
    );
}
