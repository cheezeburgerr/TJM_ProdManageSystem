import React from 'react';
import { CubeOutline, BrushOutline, TimeOutline, CheckmarkOutline } from 'react-ionicons'
const InfoBoxes = ({ boxes }) => {
    return (
        <div>
            {/* Knowing others is intelligence; knowing yourself is true wisdom. */}
            <div className="columns-2 md:columns-4">
                {boxes.map((box, index) => (
                    <div key={index} className="p-4 mb-4 break-inside-avoid-column flex flex-col justify-center items-between bg-white gap-4 text-gray-800 rounded-md shadow-md">
                        <div className='flex justify-between items-center w-full'>
                            <p className='font-semibold'>{box.title}</p>
                            <div>
                                {box.title === 'Teams' && (
                                    <div className="p-2 bg-teal-200 rounded-md"><CubeOutline
                                        color={'#00000'}

                                        height="25px"
                                        width="25px"
                                    /></div>
                                )}
                                {box.title === 'Designing' && (
                                    <div className="p-2 bg-purple-300 rounded-md"><BrushOutline
                                        color={'#00000'}

                                        height="25px"
                                        width="25px"
                                    /></div>
                                )}
                                {box.title === 'Production' && (
                                    <div className="p-2 bg-yellow-200 rounded-md"><TimeOutline
                                        color={'#00000'}

                                        height="25px"
                                        width="25px"
                                    /></div>
                                )}
                                {box.title === 'Finished' && (
                                    <div className="p-2 bg-green-300 rounded-md"><CheckmarkOutline
                                        color={'#00000'}

                                        height="25px"
                                        width="25px"
                                    /></div>
                                )}
                            </div>

                        </div>
                        <div className='flex justify-between items-end'>
                        <p className="text-3xl font-extrabold">{box.count}</p>
                        <div className='h-full'>
                            {box.plus > 0 && (
                                <>
                                <div className="p-1 bg-yellow-200 rounded-sm text-xs">+{box.plus} this week</div>
                                </>
                            )}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfoBoxes;
