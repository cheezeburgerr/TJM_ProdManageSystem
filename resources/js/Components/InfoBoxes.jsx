import React from 'react';
import { CubeOutline, BrushOutline, TimeOutline, CheckmarkOutline } from 'react-ionicons'
const InfoBoxes = ({ boxes }) => {
  return (
    <div>
      {/* Knowing others is intelligence; knowing yourself is true wisdom. */}
      <div className="columns-2 md:columns-4">
        {boxes.map((box, index) => (
          <div key={index} className="p-4 mb-4 break-inside-avoid-column flex justify-between items-start bg-white rounded-md shadow-md">
            <div>
              <p>{box.title}</p>
              <p className="text-2xl font-bold">{box.count}</p>
            </div>
            <div>
            {box.title === 'Teams' && (
                <div className="p-2 bg-teal-300 rounded-md"><CubeOutline
                color={'#00000'}

                height="25px"
                width="25px"
              /></div>
              )}
              {box.title === 'Designing' && (
                <div className="p-2 bg-yellow-300 rounded-md"><BrushOutline
                color={'#00000'}

                height="25px"
                width="25px"
              /></div>
              )}
              {box.title === 'Production' && (
                <div className="p-2 bg-indigo-300 rounded-md"><TimeOutline
                color={'#00000'}

                height="25px"
                width="25px"
              /></div>
              )}
              {box.title === 'Finished' && (
                <div className="p-2 bg-emerald-300 rounded-md"><CheckmarkOutline
                color={'#00000'}

                height="25px"
                width="25px"
              /></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBoxes;
