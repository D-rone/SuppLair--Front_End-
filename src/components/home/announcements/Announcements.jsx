import React, { useEffect, useState } from "react";
import dummyData from "./Annoucement.json"; // Ensure the path is correct
import { toast } from "react-toastify";
import AddAnnouncementPopup from "../../pupups/AddAnnouncementPopup"; 
import UpdateAnnouncementPopup from "../../pupups/UpdateAnnouncementPopup"; 
import showMore from "../../../assets/images/more.svg";

function Announcements() {
  const [announcements, setAnnouncements] = useState(dummyData);
  const [updateAnnouncement, setUpdateAnnouncement] = useState(null);
  const [deleteAnnouncement, setDeleteAnnouncement] = useState(null);
  const [addAnnouncement, setAddAnnouncement] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [filter, setFilter] = useState("all");

  const showAnnouncementOptions = (announcement) => {
    setUpdateAnnouncement(announcement);
    setDeleteAnnouncement(announcement);
  };

  const hideAnnouncementOptions = () => {
    setShowDetails(null);
  };

  const toggleDescription = (announcementId) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [announcementId]: !prev[announcementId],
    }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filter === "all") return true;
    return announcement.status === filter;
  });

  return (
    <div onClick={hideAnnouncementOptions}>
      <div className="flex items-center h-16 px-8 pt-4 mb-5">
        <div className="flex items-center justify-between w-full">
          <select
            className="py-2 px-4 rounded-lg text-2xl w-fit m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Announcements</option>
            <option value="Active">Active Announcements</option>
            <option value="Inactive">Inactive Announcements</option>
          </select>
          <button
            className="h-12 bg-supplair-primary text-xl mr-10 w-72 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            onClick={() => {
              setAddAnnouncement(true);
            }}
          >
            Add Announcement
          </button>
        </div>
      </div>
      <div>
        <table className="w-[96%] mx-[2%]">
          <thead className="text-gray-400 border-b-2 border-gray-300">
            <tr>
              <th className="font-normal">Begin Date</th>
              <th className="font-normal">End Date</th>
              <th className="font-normal">Type</th>
              <th className="font-normal">Description</th>
              <th className="font-normal">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnouncements.map((announcement) => (
              <tr
                className="border-b-2 border-gray-300 h-20"
                key={announcement.id}
              >
                <td className="px-6 whitespace-no-wrap font-regular text-supplair-secondary">
                  <h3 className="inline">{announcement.beginDate}</h3>
                </td>
                <td className="px-6 whitespace-no-wrap font-regular text-supplair-secondary">
                  <h3 className="inline">{announcement.endDate}</h3>
                </td>
                <td className="px-6 whitespace-no-wrap font-regular text-supplair-secondary">
                  <h3 className="inline">{announcement.type}</h3>
                </td>
                <td className="font-regular text-sm text-supplair-secondary w-fit">
                  <h3 className="">
                    {expandedDescriptions[announcement.id]
                      ? announcement.description
                      : `${announcement.description.substring(0, 10)}...`}
                  </h3>
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDescription(announcement.id);
                    }}
                  >
                    {expandedDescriptions[announcement.id] ? "Show Less" : "Show More"}
                  </button>
                </td>
                <td className="px-6 whitespace-no-wrap font-regular text-supplair-secondary">
                  <h3 className="inline">{announcement.status}</h3>
                </td>
                <td className="relative">
                  {showDetails === announcement.id ? (
                    <div className="absolute right-0 z-10 flex flex-col gap-2 p-2 bg-white rounded-lg shadow-sm -top-3 shadow-black h-fit w-fit">
                      <button
                        className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          showAnnouncementOptions(announcement);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="w-40 h-10 px-4 text-lg font-regular rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Announcement deleted");
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
                <td
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(announcement.id);
                  }}
                >
                  <img src={showMore} alt="" className="w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {addAnnouncement ? <AddAnnouncementPopup close={setAddAnnouncement} /> : null}
        {updateAnnouncement ? (
          <UpdateAnnouncementPopup
            announcement={updateAnnouncement}
            close={setUpdateAnnouncement}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Announcements;
