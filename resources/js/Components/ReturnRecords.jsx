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

    const [checkedOptionsMap, setCheckedOptionsMap] = useState(() => {
        // Initialize a map where each record ID is mapped to an object containing its checked options
        const initialCheckedOptionsMap = {};
        uncheckedRecords.forEach(data => {
            initialCheckedOptionsMap[data.id] = {
                'Wrong Size': false,
                'Wrong Number/Detail': false,
                'Reprint': false,
                'Other Reason': false
            };
        });
        return initialCheckedOptionsMap;
    });

    const handelReturns = (recordId, option) => {
        setCheckedOptionsMap(prevState => {
            // Update the checked options for the specific record ID
            return {
                ...prevState,
                [recordId]: {
                    ...prevState[recordId],
                    [option]: !prevState[recordId][option]
                }
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = Object.keys(checkedOptionsMap).map(recordId => {
            const checkedOptionsList = Object.keys(checkedOptionsMap[recordId]).filter(option => checkedOptionsMap[recordId][option]);
            return {
                id: recordId,
                errorType: checkedOptionsList.join(', ')
            };
        });
        console.log(requestData);
        try {

            await axios.put('/api/return-records', requestData);


            localStorage.setItem('successMessage', 'Records updated successfully!');

            window.location.reload();
        } catch (error) {
            console.error('Error updating lineup errors:', error);
            // Handle error if necessary
        }

    };

    return (
        <div className="p-4 bg-white">
            <h2 className="text-lg font-bold mb-4">Unchecked Records</h2>

            <form onSubmit={handleSubmit} className='p-4'>
                <table className="table-auto w-full">
                    <thead className='text-left'>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Errors</th>
                    </thead>
                    <tbody>
                    {uncheckedRecords.map((data, index) => (
                    <tr key={index}>
                        <input type="hidden" name="ids[]" value={data.id} />
                        <td><p>{data.player_name}</p></td>
                        <td><p>{data.player_details}</p></td>
                        <td className='w-3/5'><div className='col-span-2'>
                            {Object.keys(checkedOptionsMap[data.id]).map((option, optionIndex) => (
                                <label key={optionIndex} className='me-4'>
                                    <Checkbox
                                        className='me-2'
                                        type="checkbox"
                                        checked={checkedOptionsMap[data.id][option]}
                                        onChange={() => handelReturns(data.id, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div></td>
                    </tr>
                ))}
                    </tbody>
                </table>

                <PrimaryButton type="submit" className="btn btn-primary float-right mb-4">Update</PrimaryButton>
            </form>

        </div>
    );
}
