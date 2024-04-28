import React, { useState } from 'react';
import ProductsTable from './ProductTable';
import AddProductModal from './AddProductModal'; 

function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto flex flex-col items-start p-3">
      <div className="flex justify-between w-full">
        <h1 className="py-2 px-4 rounded-lg bg-white text-gray-800 font-bold shadow-lg dark:shadow-2xl">
          Products
        </h1>
        <button onClick={openModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ">
          Add Product
        </button>
      </div>
      <div className="m-3 w-full"> 
        <ProductsTable />
      </div>
      
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Products;
