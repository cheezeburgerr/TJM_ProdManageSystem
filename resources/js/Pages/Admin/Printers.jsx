import InfoBoxes from '@/Components/InfoBoxes';
import PrimaryButton from '@/Components/PrimaryButton';
import PrintTable from '@/Components/PrintTable';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import EmployeeLayout from '@/Layouts/EmployeeLayout';
import { Head } from '@inertiajs/react';
import Axios from 'axios'; // Step 1: Import Axios
import React, { useState } from 'react';

export default function Printers({ auth, boxes, order, artists, printers }) {
  const [updatedPrinters, setUpdatedPrinters] = useState(printers); // Step 2: State for updated printers

  const handleStatusUpdate = async (printerId, newStatus) => {
    try {
      const response = await Axios.put(`/api/printers/${printerId}`, { equipment_status: newStatus }); // Step 3: Send PUT request
      if (response.status === 200) {
        const updatedPrinterIndex = updatedPrinters.findIndex(printer => printer.id === printerId);
        if (updatedPrinterIndex !== -1) {
          const updatedPrinter = { ...updatedPrinters[updatedPrinterIndex], equipment_status: newStatus };
          const newPrinters = [...updatedPrinters];
          newPrinters[updatedPrinterIndex] = updatedPrinter;
          setUpdatedPrinters(newPrinters); // Step 4: Update state after successful update
        }
      }
    } catch (error) {
      console.error('Error updating printer status:', error);
    }
  };

  return (
    <EmployeeLayout user={auth.employee} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
   <Head title="Printers" />
      <h1 className="font-bold text-2xl mb-4">Printers</h1>
      <div className='bg-white rounded-md shadow-md p-4'>
        <table className="table-auto w-full">
          <thead>
            <tr className='text-left'>
              <th>Printer</th>
              <th>Orders</th>
              <th>Current Status</th>
              <th>Set Status</th>
            </tr>
          </thead>
          <tbody>
            {updatedPrinters && updatedPrinters.map(printer => (
              <tr key={printer.id}>
                <td>{printer.equipment_name}</td>
                <td>{printer.printer_count}</td>
                <td>{printer.equipment_status}</td>
                <td>
                  <select
                    name="printer_status"
                    id=""
                    className='rounded-md'
                    onChange={e => handleStatusUpdate(printer.id, e.target.value)} // Step 5: Call handleStatusUpdate on change
                  >
                    <option value="" disabled selected>Select</option>
                    <option value="Working">Working</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </EmployeeLayout>
  );
}
