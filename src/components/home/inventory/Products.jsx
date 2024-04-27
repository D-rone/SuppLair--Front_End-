import React from 'react';
import ProductsTable from './ProductTable';

function Products() {
  return (
    <div className="container mx-auto relative">
      <button className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded z-10">
        Add Product
      </button>
      <h1 className="absolute top-0 left-0 py-2 px-4 rounded bg-white text-gray-800 font-bold shadow-lg z-10">
        Products
      </h1>
      <div className="mt-14"> {/* Adjust this margin according to your needs */}
        <ProductsTable />
      </div>
    </div>
  );
}

export default Products;
