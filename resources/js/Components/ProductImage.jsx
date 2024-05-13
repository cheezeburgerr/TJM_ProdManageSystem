import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ProductImage = ({ image }) => (

    <LazyLoadImage
      alt={image}
      src={`/images/gallery/${image}`} />

);

export default ProductImage;
