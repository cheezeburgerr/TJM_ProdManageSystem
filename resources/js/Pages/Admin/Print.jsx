import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import PrintTable from '@/Components/PrintTable';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Print({ auth, boxes, order, artists, printers }) {



    return (
      <EmployeeLayout
      user={auth.employee}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
      >
        <Head title="Print" />
        <h1 className="font-bold text-2xl">Print</h1>
        <PrintTable order={order}/>

      </EmployeeLayout>
    );
}
