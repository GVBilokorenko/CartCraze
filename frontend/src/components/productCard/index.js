import React from 'react';
import { useGlobal } from 'context/globalContext.js';

const ProductCard = ({ product }) => {
  const {addCartItem} = useGlobal();
  
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <img src="https://www.imagineonline.store/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_823x.jpg?v=1692351320" alt={product.name} /> {/* Replace with actual image path */}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end items-center">
          <div className="badge badge-outline">{product.category.name}</div>
          <div className="badge badge-outline">${product.price}</div>
          <button className="btn btn-primary" onClick={() => addCartItem(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
