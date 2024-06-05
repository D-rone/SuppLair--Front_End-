import React, { useState, useRef, useEffect } from "react";
import { supplairAPI } from "../../../utils/axios";
import { ScaleLoader } from "react-spinners";
import Pagination from "../../utils/Pagination";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import _deleteIcon from "../../../assets/images/delete.svg";

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
      })
      .catch((err) => {
        if (Math.floor(err?.response?.status / 100) == 5) toast.error("Server Error");
        else toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    makeRequest(page);
  }, [page, updateGet]);

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
        .delete("announcement-srv/private/" + id, {
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
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
                    <td className="relative py-4 pr-10 text-sm font-medium text-right whitespace-nowrap">
                      <div className="inline-block text-left" ref={menuRef}>
                        <button
                          onClick={(e) => {
                            deleteAnnouncement(e, announcement.announcementId);
                          }}
                        >
                          <img src={_deleteIcon} className="h-6" />
                        </button>
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
