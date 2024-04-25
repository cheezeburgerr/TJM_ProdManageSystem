import React, { useState } from 'react';
import axios from 'axios';
import Checkbox from './Checkbox';
import PrimaryButton from './PrimaryButton';

export default function ReturnRecords({ uncheckedRecords, closeable=true, onClose = () => {}}) {

    const close = () => {
        if (closeable) {
            onClose();
        }
    };
    const [checkedOptions, setCheckedOptions] = useState({
        'Wrong Size': false,
        'Wrong Number/Detail': false,
        'Reprint': false,
        'Other Reason': false
    });

    const handelReturns = (index, option) => {
        setCheckedOptions({
            ...checkedOptions,
            [option]: !checkedOptions[option]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkedOptionsList = Object.keys(checkedOptions).filter(option => checkedOptions[option]);

        const requestData = {
            uncheckedRecords: uncheckedRecords.map(data => data.id),
            errorType: checkedOptionsList.join(', ')
        };

        try {
            await axios.put('/api/return-records', requestData);
             // Close the modal after successful submission
             window.location.href = '/employee/teams';
        } catch (error) {
            console.error('Error updating lineup errors:', error);
            // Handle error if necessary
        }
    };

    return (
        <div className="p-4 bg-white">
            <h2 className="text-lg font-bold mb-4">Unchecked Records</h2>

            <form onSubmit={handleSubmit}>
                {uncheckedRecords.map((data, index) => (
                    <div key={index} className='grid grid-cols-4 mb-4'>
                        <input type="hidden" name="ids[]" value={data.id} />
                        <p>Name: {data.player_name}</p>
                        <p>Details: {data.player_details}</p>
                        <div className='col-span-2'>
                            {Object.keys(checkedOptions).map((option, optionIndex) => (
                                <label key={optionIndex} className='me-4'>
                                    <Checkbox
                                        className='me-2'
                                        type="checkbox"
                                        checked={checkedOptions[option]}
                                        onChange={() => handelReturns(index, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
                <PrimaryButton type="submit" className="btn btn-primary float-right mb-4">Update</PrimaryButton>
            </form>

        </div>
    );
}
