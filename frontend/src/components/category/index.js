import React, { useState, useEffect } from 'react';
import axios from 'api/axios.js';
import { useParams } from 'react-router-dom';
import ProductCard from 'components/productCard';

const Category = () => {
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    categoryName && axios.get(`/api/product/?category=${categoryName}`)
      .then(response => { setProducts(response.data); console.log(response.data); })
  }, [categoryName])

  return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {products && products.map(product => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>);
}

export default Category;