import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';
import Modal from './Modal';
import OrderDetails from './OrderDetails';
import SecondaryButton from './SecondaryButton';

export default function AssignModal (data ) {

    const [selectedOption, setSelectedOption] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/assign-${data.mode}/${data.id}`, {
                option: selectedOption
            });
            console.log('Record updated successfully:', response.data);
            // console.log(selectedOption);
            data.onSubmit();
            setupdatedItem(response.data);
             // Close the modal after successful submission
        } catch (error) {
            console.error('Error updating record:', error);
            // Handle error
        }
    };

    return (
        <>


            <div className='p-4'>
                <h2 className='font-bold'>{`Assign ${data.mode === 'artist' ? 'Artist' : 'Printer'}`}</h2>
                <form onSubmit={handleFormSubmit}>
                    <select className='w-full mb-4 rounded-md' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="" disabled>Select {data.mode === 'artist' ? 'Artist' : 'Printer'}</option>
                        {data.options.map(option => (
                            <option value={option.value} key={option.key}>{option.label}</option>
                        ))}
                    </select>
                    <div>
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                    </div>
                </form>
            </div>


        </>
    );
}
