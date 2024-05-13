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

export default function ProductGallery({ auth, pics }) {
    const [search, setSearch] = useState('');

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    // Filter items based on search query
    const filteredItems = pics.filter(pic => {
        // Convert both search query and item name to lowercase for case-insensitive search
        const itemName = pic.name.toLowerCase();
        const searchTerm = search.toLowerCase();

        // Return true if item name contains the search query
        return itemName.includes(searchTerm);
    });

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Lineup" />
            <div className="p-4 lg:p-12 text-gray-900">
                <h1 className="font-Bebas font-bold text-4xl">Gallery</h1>
                <div className="sticky top-12 left-5 right-5 z-10 p-8">
                    <TextInput className={'w-full'} placeholder="Search" onChange={handleSearchInputChange}/>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-4">
                    {filteredItems.map(gallery => (
                        <Link key={gallery.id} href={`/product_gallery/${gallery.id}`}>
                            <div className='p-2 cursor-pointer  mb-4 transition ease-in-out delay-150 hover:scale-105   duration-300'>
                                <img
                                    src={`/images/gallery/${gallery.image}`}
                                    alt={gallery.name}
                                    className="h-56 w-full object-cover rounded-t-none"
                                    loading='lazy'
                                />
                                <Card className="max-w-sm h-sm rounded-none">
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
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
