import React, { useEffect, useState } from "react";
import AnnouncementsTable from "./AnnouncementsTable";
import AddAnnoucementsModal from "./AddAnnoucementsModal";
import testPermission from "../../../utils/verifyForbidden";
import { useUserContext } from "../../../pages/HomePage";
import { Navigate } from "react-router-dom";

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
      <div className="flex items-center justify-between w-full pb-5">
        <h1 className="px-4 py-2 m-5 text-4xl font-bold text-gray-800 bg-white rounded-lg shadow-lg dark:shadow-2x">
          Annoucements
        </h1>
        <button
          onClick={openModal}
          className="h-12 px-4 py-2 mr-10 text-xl font-bold text-white rounded-lg bg-supplair-primary w-72 hover:bg-blue-600 "
        >
          Add Annoucement
        </button>
      </div>
      <div className="w-full m-3">
        <AnnouncementsTable />
      </div>

      <AddAnnoucementsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Announcements;
