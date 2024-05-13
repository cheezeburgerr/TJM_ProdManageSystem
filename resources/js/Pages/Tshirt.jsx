import React from 'react';

import TshirtDesigner from '@/Components/TshirtDesigner';

import JerseyDesigner from '@/Components/JerseyDesigner';
import Designer from '@/Components/Designer';
import JDesigner from '@/Components/JDesigner';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Tshirt({auth}) {
  return (
    <AuthenticatedLayout  user={auth.user}>
        <div className="bg-gray-200">

      {/* <TshirtDesigner /> */}
      {/* <JerseyDesigner /> */}
      <JDesigner />
      {/* <Designer /> */}
    </div>
    </AuthenticatedLayout>
  );
}
