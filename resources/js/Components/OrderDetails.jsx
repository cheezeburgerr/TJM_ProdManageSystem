import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PrimaryButton from "./PrimaryButton";
import LineupTable from './LineupTable';
import Modal from './Modal';
import ALink from './ALink';
import { Link } from '@inertiajs/react';
import { Spinner } from 'flowbite-react';
import { CloseOutline, CubeOutline, Person, PersonOutline, Pricetag, PricetagOutline, Shirt, ShirtOutline } from 'react-ionicons';
import DangerButton from './DangerButton';
import { router } from '@inertiajs/react';
import SecondaryButton from './SecondaryButton';

export default function OrderDetails({ edit, order, className = '', ...props }) {
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(edit);
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };


    const [cancelModal, setCancelModal] = useState(false);

    const showCancelModal = () => {
        setCancelModal(true);
    }


    const closeCancelModal = () => {
        setCancelModal(false);
    }

    function changeStatus(e) {

        e.preventDefault()
        router.post(`/cancel_order/${order.production_details_id}`, {
            status: 'Cancelled'
        })

    }

    useEffect(() => {
        // setData(order);
        fetchData();
    }, [order]); // Re-fetch data when order changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/order_details/${order.order_id}`);
            setData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Render nothing if data is null
    if (!data) {
        return <div className='p-4 text-center flex justify-center items-center h-full w-full'><Spinner aria-label="Default status example" />Loading...</div>;
    }

    const formattedDueDate = moment(data.due_date).format('MMMM Do YYYY');

    return (
        <div className={`p-4 dark:text-white ${className}`}>
            <div className="flex justify-between mb-4">
                <div>
                    <p className="font-bold">Order ID#{data.order_id} <span className="bg-teal-200 rounded-md px-2 py-1">{data.status}</span></p>
                    <p>Ordered at: {data.created_at}</p>

                </div>
                <div className='flex gap-2'>
                    <div>
                        {edit === true && (

                            <>

                                {data.status == 'Pending' && (
                                    <>

                                        <PrimaryButton onClick={() => showCancelModal()} className='me-2'>Cancel Order</PrimaryButton>

                                    </>
                                )}
                                {['Pending', 'Designing'].includes(data.status) && (
                                    <Link href={`/order/${data.id}/edit`}>
                                        <PrimaryButton>Edit</PrimaryButton>
                                    </Link>
                                )}
                            </>

                        )}

                    </div>

                </div>
            </div>
            <div className="md:flex
             p-4 gap-x-16">
                <div className="md:grid grid-cols-2">
                    <div className="break-inside-avoid-column mb-8 flex gap-x-4">
                        <CubeOutline />
                        <div>
                            <p className="font-bold">Details</p>
                            <p>Team: <b>{data.team_name}</b></p>
                            <p>Apparel: <b>{data.products.product_name}</b></p>
                            <p>Due Date: <b>{formattedDueDate}</b></p>
                        </div>
                    </div>
                    <div className="break-inside-avoid-column mb-8 flex gap-x-4">
                        <ShirtOutline />
                        <div>
                            <p className="font-bold">Product Details</p>
                            {data.attributes.map(option => (
                                <p key={option.id}>{option.option_name}</p>
                            ))}
                        </div>
                    </div>
                    <div className="break-inside-avoid-column mb-8 flex gap-x-4">
                        <PricetagOutline />
                        <div>
                            <p className="font-bold">Price</p>
                            <p>Apparel Price: <b>{data.order_price}.00</b></p>
                            <p>Total Price: <b>{data.total_price}.00</b></p>

                        </div>
                    </div>

                    <div className="break-inside-avoid-column mb-8 flex gap-x-4">
                        <PersonOutline />
                        <div>
                            <p className="font-bold">Customer</p>
                            <p>Name: <b>{data.customer.name}</b></p>
                            <p>Address: <b>{data.customer.address}</b></p>
                            <p>Phone Number: <b>{data.customer.contact_number}</b></p>

                        </div>
                    </div>
                </div>
                <div className="break-inside-avoid-column mb-8 relative">
                    <p className="font-bold">Design</p>
                    <img src={`/images/customers/${data.design}`} alt="design" className='h-64 rounded-lg' onClick={toggleModal} />
                    {modalOpen && (
                        <Modal onClose={toggleModal}>
                            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
                                <img
                                    src={`/images/customers/${data.design}`}
                                    alt="design"
                                    className='max-w-full max-h-full'
                                />
                            </div>
                        </Modal>
                    )}
                </div>
                <div className="break-inside-avoid-column mb-8 relative">
                    <p className="font-bold">Downpayment</p>
                   {data.downpayment_proof ? (
                     <img src={`/images/customers/downpayment/${data.downpayment_proof}`} alt="design" className='h-64 rounded-lg' />
                   ) : (

                    <>
                   <p className="text-center"> No proof uploaded.</p>
                    </>
                   )}


                </div>

            </div>
            <div>
                <LineupTable status={data.status} order={data.lineups} id={data.order_id} data={'player_name'} edit={edit} />
            </div>
            <Modal show={cancelModal} onClose={closeCancelModal} maxWidth='xl'>
                <>

                    <div className='p-4'>
                        <h1 className='font-bold text-2xl'>Cancel Order</h1>
                        <p>Are you sure to cancel your order?</p>

                            <div className="flex w-full justify-end gap-x-2">
                            <form onSubmit={changeStatus}>
                                <DangerButton>Yes</DangerButton>
                                </form>
                                <SecondaryButton onClick={closeCancelModal}>No</SecondaryButton>
                            </div>

                    </div>
                </>
            </Modal>
        </div>

    );
}
