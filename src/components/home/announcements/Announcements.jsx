import React,{useState} from 'react'
import AnnouncementsTable from './AnnouncementsTable'
import AddAnnoucementsModal from './AddAnnoucementsModal'

function Announcements() {
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
          Annoucements
        </h1>
        <button onClick={openModal} className="h-12 bg-blue-500 text-xl  hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ">
          Add Annoucement
        </button>
      </div>
      <div className="m-3 w-full"> 
        <AnnouncementsTable />
      </div>
      
      <AddAnnoucementsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Announcements