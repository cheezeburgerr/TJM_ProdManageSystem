import React, { useState } from 'react';
import axios from 'axios';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import { CloseOutline } from 'react-ionicons';
import { Card } from 'flowbite-react';
import Modal from '@/Components/Modal';
import Carousel from 'react-multi-carousel';

export default function ProductGallery({ auth, picture, gallery }) {

    const [showPic, setShowPic] = useState(false);
    const [selectedPic, setSelectedPic] = useState('');

    const showPicture = (image) => {
        setShowPic(true);
        setSelectedPic(image);
    }

    const closePic = () => {
        setShowPic(false);
        setSelectedPic('');
    }

    const removeItem = (id) => {
        const updatedGallery = gallery.filter(product => product.id !== id);

        console.log(id, updatedGallery);
        return updatedGallery
    }

    console.log(gallery);
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Design" />
            <div className="p-4 lg:p-12 text-gray-900">
                <h1 className="font-Bebas font-bold text-4xl mb-8">Information</h1>
                <div className="md:flex justify-center items-start gap-x-8">
                    <div className="md:w-96 cursor-zoom-in" onClick={() => showPicture(picture.image)}>
                        <img src={`/images/gallery/${picture.image}`} alt="" className='' loading="lazy"/>
                    </div>
                    <div className="p-4">
                        <div className="mb-4">
                            <h3 className="font-bold font-Bebas text-3xl">{picture.name}</h3>
                            <p className='font-bold lg:text-2xl text-teal-500'>{picture.products.product_price}.00</p>
                            <p>{picture.description}</p>
                        </div>

                        <p className='font-bold'>Options</p>

                        <div className="grid grid-cols-4 gap-x-4 mb-4">
                        {picture.products.attributes.map(attr => (
                            <>

                                    <div className='w-full'>
                                        <p className="font-bold">{attr.attribute_name}</p>
                                        {attr.options.map(option => (
                                            <>
                                                <p className='text-xs'>{option.option_name}</p>
                                            </>
                                        ))}
                                    </div>

                            </>
                        ))}
                          </div>

                        <div className="flex justify-end">
                            <Link href={`/order/${picture.id}`}>
                            <PrimaryButton className='rounded-none'>Order</PrimaryButton>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl lg:px-4 lg:p-12">
                    <p className="font-semibold font-Bebas text-2xl">Similar Products</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-4">
                        {removeItem(picture.id).map(gallery => (
                            <>

                                <Link href={`/product_gallery/${gallery.id}`}>
                                    <div key={gallery.id} className='p-2 cursor-pointer  mb-4 transition ease-in-out delay-150 hover:scale-105   duration-300'>
                                        <img
                                            src={`/images/gallery/${gallery.image}`}
                                            alt={gallery.name}
                                            className="lg:h-56 w-full object-cover rounded-t-none"
                                        />
                                        <Card
                                            className="max-w-sm h-sm rounded-none "
                                        >

                                            <div className="">
                                                <h5 className="truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white font-Bebas">
                                                    {gallery.name}
                                                </h5>
                                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                                    {gallery.products.product_price}.00
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </Link>
                            </>
                        ))}
                    </div>

                </div>
            </div>

            <Modal show={showPic} onClose={closePic} className="bg-transparent" maxWidth='3xl'>
                <>
                    <img src={`/images/gallery/${selectedPic}`} alt="" className='h-screen' />
                </>
            </Modal>
        </AuthenticatedLayout>
    );
}
