import React from 'react';

import TshirtDesigner from '@/Components/TshirtDesigner';

import JerseyDesigner from '@/Components/JerseyDesigner';

export default function Tshirt() {
  return (
    <div className="bg-gray-200">
      <h1>T-Shirt Designer</h1>
      {/* <TshirtDesigner /> */}
      <JerseyDesigner />
    </div>
  );
}
