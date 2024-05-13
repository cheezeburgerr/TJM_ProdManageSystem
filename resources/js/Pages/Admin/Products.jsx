import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AdminLayout from '@/Layouts/AdminLayout';
import InputLabel from '@/Components/InputLabel';
import Checkbox from '@/Components/Checkbox';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Alert } from 'flowbite-react';

export default function Printers({ auth, products, attributes }) {
    const { props } = usePage();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedEditProduct, setSelectedEditProduct] = useState(null);
    const [selectedProductAttributes, setSelectedProductAttributes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productModal, setAddProductModal] = useState(false);
    const [editModal, showEditModal] = useState(false);


    const { data, setData, post, processing, errors, reset, progress } = useForm({
        product_name: '',
        product_price: '',
        product_image: null,

    });

    const openModal = (product) => {
        setSelectedProduct(product);
        setSelectedProductAttributes(product.attributes.map(attr => attr.attribute_name));
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const addProductModal = () => {
        setAddProductModal(true);
    };

    const closeProductModal = () => {
        setAddProductModal(false);
    };

    const editProduct = (product) => {
        setSelectedEditProduct(product);
        setSelectedProductAttributes(product.attributes.map(attr => attr.attribute_name));
        showEditModal(true);
    };

    const closeEditModal = () => {
        setSelectedProduct(null);
        setSelectedProductAttributes([]);
        showEditModal(false);
    };

    const handleAttributeCheckboxChange = (attributeName, isChecked) => {
        if (isChecked) {
            setSelectedProductAttributes(prevAttributes => [...prevAttributes, attributeName]);
        } else {
            setSelectedProductAttributes(prevAttributes => prevAttributes.filter(attr => attr !== attributeName));
        }
    };


    const submit = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('product.store'), data, {
            forceFormData: true,
        })

        reset();

        setAddProductModal(false);
    };
    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout user={auth.admin} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products</h2>}>
            <div className="p-4">
                <Head title="Products" />

                <div className="flex justify-between">
                    <h1 className="font-bold text-2xl mb-4 text-gray-900">Products</h1>
                    {props.flash.success && (
                        <>

                            <Alert color="success" className='bg-teal-500 text-gray-100'>
                                <span>{props.flash.success}</span>
                            </Alert>

                        </>
                    )}

                </div>
                <div className="flex justify-end mb-8">
                    <div className='flex gap-x-2'>
                        <PrimaryButton className='' onClick={() => addProductModal()}>Add</PrimaryButton>
                        <TextInput
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 rounded-md w-full"
                        />
                    </div>
                </div>
                <div className="lg:grid grid-cols-4 gap-4">
                    {filteredProducts.map((product, index) => (
                        <div key={index} className='rounded-md cursor-pointer mb-4' onClick={() => openModal(product)}>
                            <img
                                src={`/images/products/${product.product_image}`}
                                alt={product.product_name}
                                className="h-56 w-full object-cover rounded-t-md"
                            />
                            <div className="bg-white p-4 rounded-b-md">
                                <p className='font-bold'>{product.product_name}</p>
                                <p>{product.product_price}.00</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal show={selectedProduct !== null} maxWidth='xl' onClose={closeModal}>
                    {selectedProduct && (
                        <div>
                            <img
                                src={`/images/products/${selectedProduct.product_image}`}
                                alt={selectedProduct.product_name}
                                className="h-56 w-full object-cover rounded-t-md"
                            />
                            <div className="bg-white p-4 rounded-b-md">
                                <div className="flex justify-between">
                                    <div>
                                        <p className='font-bold'>{selectedProduct.product_name}</p>
                                        <p className='mb-4'>{selectedProduct.product_price}.00</p>
                                    </div>
                                    <div>
                                        <PrimaryButton onClick={() => editProduct(selectedProduct)}>Edit</PrimaryButton>
                                    </div>
                                </div>
                                <p className="font-bold">Details</p>
                                <div className="columns-2 w-full gap-x-4">
                                    {selectedProduct.attributes.map((attr, index) => (
                                        <div key={index} className='break-inside-avoid-column px-4 mb-4'>
                                            <p className='font-bold'>{attr.attribute_name}</p>
                                            {attr.options.map((option, index) => (
                                                <p key={index} className='text-xs'>{option.option_name}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>

                <Modal show={productModal} onClose={closeProductModal} maxWidth='3xl'>
                    <>
                        <div className='p-4 text-gray-900'>
                            <p className="text-2xl font-bold mb-6">Add Product</p>
                            <form onSubmit={submit}>
                                <div className="columns-2">
                                    <div className="break-inside-avoid-column">
                                        <div className='mb-4'>
                                            <InputLabel>Product Name</InputLabel>
                                            <TextInput type='text' name="product_name" className='w-full' value={data.product_name} onChange={(e) => setData('product_name', e.target.value)} />
                                        </div>
                                        <div className='mb-4'>
                                            <InputLabel>Product Price</InputLabel>
                                            <TextInput type='number' min="0" name="product_price" className='w-full' value={data.product_price} onChange={(e) => setData('product_price', e.target.value)} />
                                        </div>
                                        <div className='mb-4'>
                                            <InputLabel>Product Image</InputLabel>
                                            <TextInput type='file' name="product_image" className='w-full'  onChange={(e) => setData('product_image', e.target.files[0])} />
                                            {progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </div>
                                    </div>
                                    <div className="break-inside-avoid-column">
                                        <p className="font-bold">Attributes</p>
                                        <div className="mb-4">
                                            {attributes.map(attr => (
                                                <>
                                                    <p><span className='inline me-2'><Checkbox /></span>{attr.attribute_name}</p>
                                                </>
                                            ))}
                                        </div>
                                        <div>
                                            <InputLabel>Or add new attribute</InputLabel>
                                            <TextInput name='new_attr' />
                                        </div>
                                        <div>
                                            <PrimaryButton>Add</PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </>

                </Modal>

                <Modal show={editModal} onClose={closeEditModal} maxWidth='xl'>
                    <>
                        {selectedEditProduct && (
                            <div className='p-4 text-gray-900'>
                                <p className="text-2xl font-bold mb-6">Edit Product</p>
                                <form>
                                    <div className="columns-2">
                                        <div className="break-inside-avoid-column">
                                            <div className='mb-4'>
                                                <InputLabel>Product Name</InputLabel>
                                                <TextInput type='text' name="product_name" value={selectedEditProduct.product_name} className='w-full' onChange={(e) => setSelectedEditProduct(prevState => ({
                                                    ...prevState,
                                                    product_name: e.target.value
                                                }))} />
                                            </div>
                                            <div className='mb-4'>
                                                <InputLabel>Product Price</InputLabel>
                                                <TextInput type='number' min="0" name="product_price" value={selectedEditProduct.product_price} className='w-full' onChange={(e) => setSelectedEditProduct(prevState => ({
                                                    ...prevState,
                                                    product_price: e.target.value
                                                }))} />
                                            </div>
                                            <div className='mb-4'>
                                                <InputLabel>Product Image</InputLabel>
                                                <TextInput type='file' name="product_product_image" className='w-full' />
                                            </div>
                                        </div>
                                        <div className="break-inside-avoid-column">
                                            <p className="font-bold">Attributes</p>
                                            <div className="mb-4">
                                                {attributes.map((attr, index) => (
                                                    <div key={index} className='break-inside-avoid-column px-4 mb-1'>
                                                        <label>
                                                            <Checkbox
                                                                className='me-2'
                                                                checked={selectedProductAttributes.includes(attr.attribute_name)}
                                                                onChange={(e) => handleAttributeCheckboxChange(attr.attribute_name, e.target.checked)}
                                                            />
                                                            <span className='inline me-2'>{attr.attribute_name}</span>
                                                        </label>
                                                        {/* {attr.options.map((option, index) => (
                                                        <p key={index} className='text-xs'>{option.option_name}</p>
                                                    ))} */}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <InputLabel>Or add new attribute</InputLabel>
                                                <TextInput name='new_attr' />
                                            </div>
                                            <div>
                                                <PrimaryButton>Update</PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                </Modal>
            </div>
        </AdminLayout>
    );
}
