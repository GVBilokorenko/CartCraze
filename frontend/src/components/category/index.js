import React, { useEffect } from 'react';
import axios from 'api/axios.js';
import ProductCard from 'components/productCard';
import { useGlobal } from 'context/globalContext.js';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { products, setProducts } = useGlobal();
  const { categoryName } = useParams();

  useEffect(() => {
    categoryName && axios.get(`/api/product/?category=${categoryName}`)
      .then(response => { setProducts(response.data) })
  }, [categoryName, setProducts])

  return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {products && products.map(product => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>);
}

export default Category;