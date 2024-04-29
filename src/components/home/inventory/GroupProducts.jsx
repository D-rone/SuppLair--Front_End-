import React, { useState } from "react";
import GroupProductsTable from "./GroupProductsTable";
import AddGroupProductModal from "./AddGroupProductModal";

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex justify-between items-center w-full pb-5">
        <h2 className="py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2xl">Group Products</h2>
        <button className=" h-12 bg-blue-500 text-xl  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={handleOpenModal}>
          Add Group Product
        </button>
      </div>
      <GroupProductsTable />
      <AddGroupProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default ParentComponent;
