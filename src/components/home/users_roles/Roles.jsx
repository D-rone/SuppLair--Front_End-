import React,{useState} from 'react'
import RoleAccessTable from './RolesTable'
import AddRoleModal from './AddRoleModal';

function Roles() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
<div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
      <h1 className="py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">
        Roles
      </h1>
      <button onClick={openModal} className="h-12 bg-supplair-primary text-xl mr-10 w-72 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ">
          Add Role
        </button>
     
    </div>
      <RoleAccessTable></RoleAccessTable>
      <AddRoleModal isOpen={isModalOpen} onClose={closeModal} />
    </div>)
}

export default Roles