import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import Modal from './Modal';
import OrderDetails from './OrderDetails';
import ALink from './ALink';
import TextInput from './TextInput';
import axios from 'axios';
import { Pencil, Trash } from 'react-ionicons';

export default function LineupTable({ status, order, data, id, edit }) {
    const [orderBy, setOrderBy] = useState("");
    const [orders, setOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [editMode, setEditMode] = useState(new Array(order.length).fill(false));
    const [player, setPlayer] = useState("");
    const [lineup, setLineup] = useState(order);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Adjust as needed

    // Pagination calculation
    const totalPages = Math.ceil(lineup.length / pageSize);
    const indexOfLastItem = currentPage * pageSize;
    const indexOfFirstItem = indexOfLastItem - pageSize;
    const currentItems = lineup.slice(indexOfFirstItem, indexOfLastItem);


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
        const sortedLineup = [...lineup].sort((a, b) => {
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
        setLineup(sortedLineup);
    };

    console.log();
    const column = [
        { title: 'Name', field: 'player_name' },
        { title: 'Details', field: 'player_details' },
        { title: 'Classification', field: 'classification' },
        { title: 'Gender', field: 'gender' },
        { title: 'Upper Size', field: 'upper_size' },
        { title: 'Short Size', field: 'short_size' },
        { title: 'Short Name', field: 'short_name' },
        // Add more columns as needed
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({ ...player, [name]: value });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/get-lineup/${id}`);
            setLineup(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const editModal = async (index, order_id) => {
        try {
            const response = await axios.get(`/api/edit_lineup/${order_id}`);
            const playerData = response.data.player; // Accessing response.data instead of response.player

            // Update the state with the fetched player data
            setPlayer(playerData);
            console.log('ss');
            console.log(response.data.player);

            setEditMode((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const closeModal = (index) => {
        setEditMode((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };


    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const openDeleteModal = (itemId) => {
        setSelectedItemId(itemId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedItemId(null);
        setDeleteModalOpen(false);
    };

    const deleteRecord = async () => {
        try {
            await axios.delete(`/api/delete-player/${selectedItemId}`);
            // Perform any additional actions after deletion if needed
            fetchData(); // Refresh the data after deletion
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };



    return (
        <>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between p-4 bg-white">
                    <div>Lineup</div>
                    <div className='flex gap-2'>
                        {(edit && status == 'Designing' || status == 'Pending') && (
                            <ALink href={`/lineup/${id}`}>Add</ALink>
                        )}
                        <TextInput
                            type="text"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {column &&
                            column.map((item, index) => (
                                <th
                                    scope="col"
                                    className="px-6 py-3 cursor-pointer"
                                    onClick={() => sortData(item.field)}
                                    key={index} // Add key prop to avoid react warning
                                >{item.title}
                                    <span>
                                        {orderBy === item.field && (orders === "asc" ? "⬆" : "⬇")}
                                    </span>
                                </th>
                            ))}
                        <th></th>
                    </thead>
                    <tbody>
                        {Array.isArray(currentItems) && // Check if order is an array
                            currentItems
                                .filter((item) => {
                                    if (!data || searchTerm === "") {
                                        return true; // Filter all items if no search term provided or data is undefined
                                    } else if (
                                        item[data]?.toLowerCase().includes(searchTerm.toLowerCase())
                                    ) {
                                        return true;
                                    }
                                    return false;
                                })
                                .map((item, index) => (
                                    <tr
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        key={index} // Add key prop to avoid react warning
                                    >
                                        {column.map((col, colIndex) => (
                                            <td className="px-6 py-4" key={colIndex}>
                                                <p>{item[col.field]}</p>
                                            </td>
                                        ))}
                                        <td>
                                            {['Pending', 'Designing'].includes(status) && (
                                                <>
                                                    <div className="flex gap-x-2">
                                                        <Pencil onClick={() => editModal(index, item.id)} className='me-2 cursor-pointer'>Edit</Pencil>

                                                        <Trash onClick={() => openDeleteModal(item.id)} className='me-2 cursor-pointer'>Delete</Trash>
                                                    </div>

                                                    <Modal
                                                        show={editMode[index]}
                                                        id={item.id}
                                                        onClose={() => closeModal(index)}

                                                    >
                                                        <EditTable index={index} />
                                                    </Modal>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        {Array.isArray(currentItems) && currentItems.filter(item => !data || searchTerm === "" || item[data]?.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                            <tr>
                                <td colSpan={column.length + 1} className="text-center py-4">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                </div>
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
                <Modal
                    show={deleteModalOpen}

                    onClose={closeDeleteModal}
                    maxWidth='sm'
                >
                    <div className="p-4">
                        <p>Are you sure you want to delete this record?</p>
                        <div className="flex justify-end mt-4 gap-x-2">
                            <PrimaryButton onClick={deleteRecord}>Yes</PrimaryButton>
                            <PrimaryButton onClick={closeDeleteModal}>No</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );



    function EditTable({ index }) {
        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.put(`/api/update-player/${player.id}`, player);
                console.log(response.data);
                closeModal(index);
                fetchData();
                // Handle success, e.g., show a success message
            } catch (error) {
                console.error('Error updating player:', error);
                // Handle error, e.g., show an error message
            }
        };
        return (
            <>
                <div className='p-4'>
                    <h1 className='text-lg font-bold'>Edit Player Details</h1>

                    <form onSubmit={handleSubmit}>

                        <table className='w-full mb-4'>
                            <thead>
                                <tr className='text-left'>
                                    <th className="">Name</th>
                                    <th>Number/Position</th>
                                    <th className="">Classification</th>
                                    <th>Gender</th>
                                    <th>Upper Size</th>
                                    <th>Short Size</th>
                                    <th>Short Name</th>

                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td data-label="Name">
                                        <TextInput value={player.player_name} className="w-full md:w-48" type="text" name={`player_name`} placeholder="Name" required onChange={handleChange} />
                                    </td>
                                    <td data-label="Number">
                                        <TextInput value={player.player_details} className="w-full md:w-36" type="text" name={`player_details`} placeholder="Number" onChange={handleChange} />
                                    </td>
                                    <td data-label="Classification">
                                        <select value={player.classification} className="w-full md:w-36" name={`classification`} required onChange={handleChange}>
                                            <option value="" disabled>Select Classification</option>
                                            <option value="Adult">Adult</option>
                                            <option value="Kid">Kid</option>
                                        </select>
                                    </td>
                                    <td data-label="Gender">
                                        <select value={player.gender} className="w-full md:w-36" name={`gender`} required onChange={handleChange}>
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </td>
                                    <td data-label="Upper Size">
                                        <TextInput value={player.upper_size} className="w-full md:w-36" type="text" name={`upper_size`} placeholder="Upper Size" onChange={handleChange} />
                                    </td>
                                    <td data-label="Short Size">
                                        <TextInput value={player.short_size} className="w-full md:w-36" type="text" name={`short_size`} placeholder="Short Size" onChange={handleChange} />
                                    </td>
                                    <td data-label="Short Name">
                                        <TextInput value={player.short_name} className="w-full md:w-36" type="text" name={`short_name`} placeholder="" onChange={handleChange} />
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                        <div className="w-full float-right mb-4">
                            <PrimaryButton>Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
