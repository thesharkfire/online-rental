// Results.js
import React from 'react';
import { useSelector } from 'react-redux';

const Results = () => {
  const products = useSelector((state) => state.searchResults);

  return (
    <div>
      <h1>Search Results</h1>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          <p>{product.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
