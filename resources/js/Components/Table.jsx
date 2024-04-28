import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import Modal from './Modal';
import OrderDetails from './OrderDetails';
import SecondaryButton from './SecondaryButton';
import AssignModal from './AssignModal';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';
import { Progress, Tooltip } from 'flowbite-react';
import { ArrowForward, CaretDownOutline, CaretUpOutline, EllipsisVertical, Eye } from 'react-ionicons'


export default function Table({ order, column, data, emp, fetchData, artists, printers, onRecordSelect }) {


    const currentUrl = window.location.pathname;
    const [orderBy, setOrderBy] = useState("");
    const [orders, setOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [viewIndex, setViewIndex] = useState(null);
    const [assignIndex, setAssignIndex] = useState(null);
    const [teams, setTeams] = useState(order);
    const [fetchWithout, setFetchWithout] = useState(fetchData);
    const [artist, setShowArtist] = useState(false);
    const [modalMode, setModalMode] = useState("");
    const [updatedItem, setupdatedItem] = useState("");


    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Adjust as needed

    // Pagination calculation
    const totalPages = Math.ceil(teams.length / pageSize);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = teams.slice(indexOfFirstItem, indexOfLastItem);


    const maxPageLinks = 5; // Adjust the number of visible page links
    const pageLinks = [];
    for (let i = Math.max(1, currentPage - Math.floor(maxPageLinks / 2)); i <= Math.min(totalPages, currentPage + Math.floor(maxPageLinks / 2)); i++) {
        pageLinks.push(i);
    }

    // Pagination handlers
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const sortData = (field) => {
        const isAsc = orderBy === field && orders === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(field);
        const sortedTeams = [...teams].sort((a, b) => {
            const valueA = a[field];
            const valueB = b[field];
            if (valueA < valueB) {
                return isAsc ? -1 : 1;
            }
            if (valueA > valueB) {
                return isAsc ? 1 : -1;
            }
            return 0;
        });
        setTeams(sortedTeams);
    };

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('/api/without-artist');
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        if (fetchWithout || updatedItem) {
            fetchItems();
            setFetchWithout(false);
        }
    }, [fetchWithout, updatedItem]);

    const handleApprove = (order_id) => {

        return () => {
            const apiUrl = '/api/approve';


            const requestData = {
                order_id: order_id,

            };

            axios.put(apiUrl, requestData)
                .then(response => {

                    console.log('Record updated successfully:', response.data);
                    window.location.href = '/employee/pending'

                })
                .catch(error => {

                    console.error('Error updating record:', error);

                });
        }
    };

    const viewOrder = (index) => {
        setViewIndex(index);
        setEditMode((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        });
    };

    const showAssign = (mode, index) => {
        setAssignIndex(index);
        setModalMode(mode);
        setShowArtist(true);
    };


    const closeAssign = () => {
        setShowArtist(false);
    };





    const closeModal = (index) => {

        setViewIndex(null); // Move this line outside of the setEditMode function
    };


    return (
        <>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between p-4 bg-white">
                    <div>Teams</div>
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs bg-white text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {column &&
                            column.map((item, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer "
                                    onClick={() => sortData(item.field)}
                                    key={index} // Add key prop to avoid react warning
                                >
                                    {item.title}
                                    <span>
                                        {orderBy === item.field && (orders === "asc" ? <CaretUpOutline
                                            color={'#00000'}
                                            height="10px"
                                            width="10px"
                                        /> : <CaretDownOutline
                                            color={'#00000'}

                                            height="10px"
                                            width="10px"
                                        />)}
                                    </span>
                                </th>
                            ))}
                        <th></th>
                    </thead>
                    <tbody>
                        {Array.isArray(currentItems) && currentItems.length === 0 ? ( // Check if currentItems is an empty array
                            <tr>
                                <td colSpan={column.length + 1} className="px-6 py-4 text-center bg-white text-md">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            currentItems.filter((item) => {
                                if (!data || searchTerm === "") {
                                    return true;
                                } else if (
                                    item[data]?.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return true;
                                }
                                return false;
                            })
                                .map((item, index) => (
                                    <tr
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer"
                                        key={index}
                                        onClick={() => onRecordSelect(item)}
                                    >
                                        {column.map((col, colIndex) => (
                                            <td className="px-6 py-4" key={colIndex}>
                                                <p>
                                                    {col.field === 'status' ? (
                                                        <>
                                                            {
                                                                item[col.field] === 'Pending' ? (
                                                                    <span className='bg-yellow-200 px-2 rounded-full'>{item[col.field]}</span>
                                                                ) : item[col.field] === 'Designing' ? (
                                                                    <span className='bg-teal-200 px-2 rounded-full'>{item[col.field]}</span>
                                                                ) : item[col.field] === 'Ready to Print' ? (
                                                                    <span className='bg-teal-200 px-2 rounded-full'>{item[col.field]}</span>
                                                                ) : item[col.field] === 'Printing' ? (
                                                                    <span className='bg-orange-200 px-2 rounded-full'>{item[col.field]}</span>
                                                                ) : item[col.field] === 'Printed' ? (
                                                                    <span className='bg-emerald-200 px-2 rounded-full'>{item[col.field]}</span>
                                                                ) : (
                                                                    item[col.field]
                                                                )}
                                                        </>
                                                    ) : (
                                                        item[col.field]
                                                    )}

                                                </p>
                                            </td>
                                        ))}
                                        <td className='flex gap-x-1 items-center px-4'>

                                            <Tooltip content="View">
                                            <Eye height={'20px'} onClick={() => viewOrder(index)} color={'#1f2937'} className='mx-2  cursor-pointer' />
                                            </Tooltip>


                                            {/* {currentUrl === '/employee/production' && (
                                                <>
                                                    <SecondaryButton  className='font-bold uppercase text-xs me-1'>Check</SecondaryButton>
                                                </>
                                            )} */}
                                            {currentUrl !== 'employee/dashboard' && (
                                                <>


                                                    {emp == 1 && (
                                                        <>
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <>
                                                                        <EllipsisVertical className={'cursor-pointer'} />
                                                                    </>
                                                                </Dropdown.Trigger>

                                                                <Dropdown.Content>
                                                                    <a onClick={() => showAssign('artist', index)} className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out '>Assign Artist</a>

                                                                    {(item.artist_id != null) && (
                                                                        <>
                                                                            <a onClick={() => showAssign('printer', index)} className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out '>Proceed</a>

                                                                        </>
                                                                    )}
                                                                </Dropdown.Content>
                                                            </Dropdown>

                                                        </>
                                                    )}





                                                    {(emp === 2 && currentUrl === '/employee/pending') && (
                                                        <SecondaryButton onClick={handleApprove(item.production_details_id)} className='font-bold   uppercase text-xs me-1'>Approve</SecondaryButton>
                                                    )}
                                                    {emp === 4 && (
                                                        <Link href={route('employee.print', { id: item.order_id })}>
                                                            <SecondaryButton className='font-bold   uppercase text-xs me-1'>Print</SecondaryButton>
                                                        </Link>
                                                    )}
                                                </>
                                            )}

                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>

                <div className="flex justify-between p-4 bg-white">
                    <div></div>
                    <div className="flex gap-2">
                        <button className="p-2" onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                        {pageLinks.map((page) => (
                            <button key={page} onClick={() => goToPage(page)} className={currentPage === page ? 'font-bold bg-teal-500 px-4 text-white rounded-md' : 'px-4'}>{page}</button>
                        ))}
                        <button className="p-2" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
                    </div>
                </div>

                {viewIndex !== null && (
                    <Modal show={true} onClose={closeModal}>
                        <OrderDetails order={teams[viewIndex]} edit={false} />
                    </Modal>
                )}

                {assignIndex !== null && (
                    <Modal show={artist} onClose={closeAssign} maxWidth='sm'>
                        <AssignModal
                            id={teams[assignIndex].production_details_id}
                            mode={modalMode}
                            options={modalMode === 'artist' ? artists.map(artist => ({ value: artist.employee_id, label: artist.first_name })) : printers.map(printer => ({ value: printer.id, label: printer.equipment_name }))}
                            onSubmit={closeAssign}
                        />
                    </Modal>
                )}




            </div>
        </>
    );


}
