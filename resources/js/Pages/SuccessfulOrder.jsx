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
import OrderDetails from '@/Components/OrderDetails';

export default function ProductGallery({ auth, order }) {


    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Verifying your order" />
            <div className="p-4 lg:p-12 text-gray-900">
               <div className='mb-8'>
               <h1 className="text-center font-bold text-2xl font-Bebas">Verifying your order</h1>
                <p className='text-center'>We are verifying your placed order. We will notify you when this order is approved.</p>
               </div>
                <div className="px-4 py-2 bg-white rounded-md">
                <OrderDetails order={order} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
