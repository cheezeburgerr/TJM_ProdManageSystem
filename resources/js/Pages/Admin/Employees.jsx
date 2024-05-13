import React, { useState } from 'react';
import { Card } from 'flowbite-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';
import { Alert } from 'flowbite-react';
import { Archive, Eye } from 'react-ionicons';


export default function Printers({ auth, employees, departments, printers }) {



    const {props} = usePage();
    const [emp, setEmp] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        department_id: '',
    });


    // Filter employees based on search query and selected department
    const filteredEmployees = emp.filter(employee => {
        const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
        const departmentId = employee.department_id; // Assuming you have department_id in the employee object

        // Filter by search query and department
        const matchesSearchQuery = fullName.includes(searchQuery.toLowerCase());
        const matchesSelectedDepartment = selectedDepartment === 'All' || departmentId === parseInt(selectedDepartment); // Compare departmentId with selectedDepartment

        return matchesSearchQuery && matchesSelectedDepartment;
    });

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle department filter change
    const handleDepartmentFilterChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const addEmployee = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openDetails = (employee) => {
        setSelectedEmployee(employee);

    };

    const closeDetails = () => {
        setSelectedEmployee(null);

    };


    const handleAddEmployee = (e) => {
        e.preventDefault();
        console.log(data);

        post(route('add.employee'), data)

        reset();
        // Add logic to handle adding employee
        setShowModal(false); // Close the modal after adding employee
    };

    return (
        <AdminLayout user={auth.admin} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}>
            <Head title="Employees" />

            <div className="flex justify-between">
                <h1 className="font-bold text-2xl mb-4 text-gray-900">Employees</h1>
                {props.flash.success && (
                    <>

                        <Alert color="success" className='bg-teal-500 text-gray-100'>
                            <span>{props.flash.success}</span>
                        </Alert>

                    </>
                )}

            </div>
            <div className='text-gray-900'>
                <div className="flex justify-between mb-8">
                    {/* Department filter */}
                    <select
                        value={selectedDepartment}
                        onChange={handleDepartmentFilterChange}
                        className="border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="All">All Departments</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>{department.department_name}</option>
                        ))}
                    </select>
                    <div className='flex gap-x-2 items-center'>
                        <PrimaryButton onClick={addEmployee}>Add</PrimaryButton>
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>
                <div className="md:grid grid-cols-4 gap-4">
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map(employee => (
                            <div key={employee.id} className="bg-white rounded-md shadow sm p-4 flex flex-col items-center justify-center">
                                <img src={employee.profile_image ? `/images/employees/${employee.profile_image}` : '/images/customers/profile.jpg'} alt="" className='h-36 rounded-full mb-4' />
                                <p className='font-bold'>{employee.first_name} {employee.last_name}</p>
                                <p className='text-center text-xs mb-4'>{employee.department.department_name}</p>
                                <div className="flex gap-x-2 cursor-pointer">
                                    <Eye onClick={() => openDetails(employee)}/><Archive/>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No records found.</p>
                    )}
                </div>
                <Modal show={showModal} maxWidth='xl' onClose={closeDetails}>
                    <>
                        <form onSubmit={handleAddEmployee}>
                            <div className='p-4'>
                                <h1 className="font-bold text-xl mb-4">Add Employee</h1>
                                <div className="flex gap-x-4 w-full mb-4">
                                    <div className='w-full'>
                                        <InputLabel>First Name</InputLabel>
                                        <TextInput type='text' name='first_name' className='w-full' required value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>
                                    <div className='w-full'>
                                        <InputLabel>Last Name</InputLabel>
                                        <TextInput type='text' name='last_name' className='w-full' required onChange={(e) => setData('last_name', e.target.value)} value={data.last_name} />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>
                                </div>
                                <div className='w-full mb-4'>
                                    <InputLabel>Email</InputLabel>
                                    <TextInput type='email' name='email' className='w-full' required onChange={(e) => setData('email', e.target.value)} value={data.email} />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className='mb-4'>
                                    <InputLabel>Department</InputLabel>
                                    <select
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full "
                                        onChange={(e) => setData('department_id', e.target.value)} value={data.department_id}
                                    >
                                        <option disabled>Select Department</option>
                                        {departments.map(department => (
                                            <option key={department.id} value={department.id}>{department.department_name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.department_id} className="mt-2" />
                                </div>
                                <div className='flex gap-x-2 justify-end'>
                                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                                    <PrimaryButton disabled={processing}>Add</PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </>
                </Modal>

                <Modal show={selectedEmployee !== null } maxWidth='xl' onClose={closeDetails}>
                    {selectedEmployee && (
                        <>
                            <div className="flex gap-x-8 items-center p-4">
                                <div>
                                    <img src={selectedEmployee.profile_image ? `/images/employees/${selectedEmployee.profile_image}` : '/images/customers/profile.jpg'} alt="" className='h-32 rounded-full' />
                                </div>
                                <div>
                                    <p className="font-bold text-xl">{selectedEmployee.first_name} {selectedEmployee.last_name}</p>
                                    <p>{selectedEmployee.department.department_name}</p>
                                    <p>{selectedEmployee.email}</p>
                                </div>
                            </div>
                        </>
                    )}

                </Modal>
            </div>
        </AdminLayout>
    );
}
