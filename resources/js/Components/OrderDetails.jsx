import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PrimaryButton from "./PrimaryButton";
import LineupTable from './LineupTable';
import Modal from './Modal';
import ALink from './ALink';
import { Link } from '@inertiajs/react';

export default function OrderDetails({ edit, order, className = '', ...props }) {
    const [data, setData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(edit);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };




    useEffect(() => {
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
        return <div className='p-4 text-center'>Loading...</div>;
    }

    const formattedDueDate = moment(data.due_date).format('MMMM Do YYYY');

    return (
        <div className={`p-4 dark:text-white ${className}`}>
            <div className="flex justify-between mb-4">
                <div>
                    <p>Order ID <span className="font-bold">#{data.order_id}</span></p>
                    <p>Ordered at: {data.created_at}</p>
                    <p>Status: <span className="bg-teal-200 rounded-full px-2 py-1">{data.status}</span></p>
                </div>
                <div>
                   {edit === true && (
                     <Link href={`/order/${data.id}/edit`}>
                     <PrimaryButton>Edit</PrimaryButton>
                     </Link>
                   )}
                </div>
            </div>
            <div className="columns-2 p-4">
                <div className="break-inside-avoid-column mb-8">
                    <p>Team: <b>{data.team_name}</b></p>
                    <p>Apparel: <b>{data.products.product_name}</b></p>
                    <p>Due Date: <b>{formattedDueDate}</b></p>
                </div>
                <div className="break-inside-avoid-column mb-8">
                    <p>Product Details</p>
                    {data.attributes.map(option => (
                        <p key={option.id}><b>{option.option_name}</b></p>
                    ))}
                </div>
                <div className="break-inside-avoid-column mb-8">
                    <p>Price</p>
                    <p>Apparel Price: <b>{data.order_price}.00</b></p>
                    <p>Apparel Price: <b>{data.total_price}.00</b></p>

                </div>
                <div className="break-inside-avoid-column mb-8">
                    <p>Design</p>
                    <img src={`/images/customers/${data.design}`} alt="design" className='h-48 rounded-lg' onClick={toggleModal}/>
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

            </div>
            <div>
                <LineupTable status={data.status} order={data.lineups} id={data.order_id} data={'player_name'} edit={edit}/>
            </div>
        </div>
    );
}
