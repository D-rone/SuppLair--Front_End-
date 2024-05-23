import React, { useEffect, useState } from "react";
import AnnouncementsTable from "./AnnouncementsTable";
import AddProductsGroupPopup from "../../pupups/AddProductsGroupPopup";

function Announcements() {
  const [addPopup, setAddPopup] = useState(false);

  let openAddPopup = () => {
    setAddPopup(true);
  };

  const [menuOpen, setMenuOpen] = useState(null);
  const [updateGet, setUpdateGet] = useState(false);

  return (
    <div
      className="container mx-auto"
      onClick={() => {
        setMenuOpen(null);
      }}
    >
      <div className="flex items-center justify-between w-full pb-5">
        <h1 className="px-4 py-2 m-5 text-4xl font-bold text-gray-800 bg-white rounded-lg shadow-lg dark:shadow-2x">
          Annoucements
        </h1>
        <button
          onClick={openAddPopup}
          className="h-12 px-4 py-2 mr-10 text-xl font-bold text-white rounded-lg bg-supplair-primary w-72 hover:bg-blue-600 "
        >
          Add Annoucement
        </button>
      </div>
      <div className="w-full h-full">
        <AnnouncementsTable updateGet={updateGet} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setUpdateGet={setUpdateGet} />
      </div>

      {addPopup ? <AddProductsGroupPopup close={setAddPopup} setUpdateGet={setUpdateGet} /> : <></>}
    </div>
  );
}

export default Announcements;
