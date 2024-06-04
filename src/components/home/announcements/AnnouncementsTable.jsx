import React, { useState, useRef, useEffect } from "react";
import { supplairAPI } from "../../../utils/axios";
import { ScaleLoader } from "react-spinners";
import Pagination from "../../utils/Pagination";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const AnnouncementsTable = ({ updateGet, menuOpen, setMenuOpen, setUpdateGet }) => {
  const menuRef = useRef();

  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(0);

  const [announcementsData, setAnnouncemenetsData] = useState(0);

  let makeRequest = (page) => {
    setLoading(true);
    const cookies = new Cookies();
    const storedAccessToken = cookies.get("access_token");

    supplairAPI
      .get("announcement-srv/private/announcements?page=" + page + "&size=6", {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      })
      .then((data) => {
        setAnnouncemenetsData(data.data?.content);
        setTotalPages(data.data?.totalPages);
        // console.log(data.data.map(d=>d.companyId))
        setLoading(false);
      })
      .catch((err) => {
        if (Math.floor(err?.response?.status / 100) == 5) toast.error("Server Error");
        else toast.error(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    makeRequest(page);
  }, [page, updateGet]);

  const toggleMenu = (e, announcementId) => {
    e.stopPropagation();
    if (menuOpen === announcementId) {
      setMenuOpen(null);
    } else {
      setMenuOpen(announcementId);
    }
  };

  let checkAnnouncemnetStatus = (startDate, endDate) => {
    let now = new Date();

    let sDate = new Date(startDate);
    let eDate = new Date(endDate);

    if (now >= sDate && now <= eDate) {
      return "Active";
    }
    if (now > eDate) {
      return "Expired";
    }
    if (now < sDate) {
      return "Not Started Yet";
    }
  };

  let deleteAnnouncement = (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete the announcement ?")) {
      const cookies = new Cookies();
      const storedAccessToken = cookies.get("access_token");  
      supplairAPI
        .delete("announcement-srv/private/" + id , {
          headers : {
            Authorization : `Bearer ${storedAccessToken}`
          }
        })
        .then((response) => {
          setUpdateGet((prev) => !prev);
          toast.success(response.data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
              Image
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Begin Date
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              End Date
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3"></th>
            {/* Empty header for menu column */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr className="h-[300px]">
              <td>
                <div className="absolute top-0 flex items-center justify-center w-full h-full">
                  <ScaleLoader />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {announcementsData.length > 0 ? (
                announcementsData.map((announcement) => (
                  <tr key={announcement.announcementId}>
                    <td className="px-6 py-2 whitespace-nowrap h-[70px] flex justify-center">
                      <a href={announcement.imagePath} target="_blank">
                        <img src={announcement.imagePath} className="h-[55px]" />
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(announcement.startDate).toDateString()}
                    </td>
                    <td className="px-6 py-4 text-supplair-primary whitespace-nowrap">
                      {new Date(announcement.endDate).toDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {checkAnnouncemnetStatus(announcement.startDate, announcement.endDate)}
                    </td>
                    <td className="relative px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <div className="inline-block text-left" ref={menuRef}>
                        <button
                          onClick={(e) => toggleMenu(e, announcement.announcementId)}
                          type="button"
                          className="inline-flex justify-center p-2 text-white rounded-full bg-supplair-primary focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          {/* SVG code provided */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {menuOpen === announcement.announcementId && (
                          <div className="absolute right-0 z-50 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5">
                            <div className="absolute border-b-8 border-l-8 border-r-8 border-l-transparent border-r-transparent border-b-red-600 top-[-6px] left-24"></div>
                            <button
                              className="block w-full px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-700 "
                              role="menuitem"
                              onClick={(e) => {
                                deleteAnnouncement(e, announcement.announcementId);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="h-[300px]">
                  <td></td>
                  <td>
                    <div className="flex items-center justify-center w-full h-full">
                      No Announcements Created, go Add new announcements
                    </div>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
      <div className="h-16"></div>
      <div className="fixed bg-white bottom-5 right-10">
        <Pagination
          totalPages={totalPages}
          page={page}
          setPage={setPage}
          makeRequest={makeRequest}
        />
      </div>
    </div>
  );
};

export default AnnouncementsTable;
