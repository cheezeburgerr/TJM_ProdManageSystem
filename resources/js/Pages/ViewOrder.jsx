import React from 'react';

import TshirtDesigner from '@/Components/TshirtDesigner';

import JerseyDesigner from '@/Components/JerseyDesigner';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import OrderDetails from '@/Components/OrderDetails';
export default function ViewOrder({auth, order}) {
  return (
    <AuthenticatedLayout  user={auth.user}>

    <div className="md:p-12">
    <h1 className="font-bold text-gray-900 text-2xl">Order Details</h1>
    <OrderDetails order={order} edit={true}/>
    </div>
    </AuthenticatedLayout>
  );
}
