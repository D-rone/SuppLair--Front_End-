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
      <div className="mb-4 flex justify-between w-full">
        <h2 className="py-2 px-4 rounded-lg bg-white text-gray-800 font-bold shadow-lg dark:shadow-2xl">Group Products</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ml-2" onClick={handleOpenModal}>
          Add Group Product
        </button>
      </div>
      <GroupProductsTable />
      <AddGroupProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default ParentComponent;
