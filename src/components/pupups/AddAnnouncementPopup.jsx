import React, { useReducer, useRef, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";
import { fileUpload, supplairAPI } from "../../utils/axios";
import { ClockLoader } from "react-spinners";
import Cookies from "universal-cookie";

function AddAnnouncementPopup({ close, setUpdateGet }) {
  let closePopup = (e) => {
    if (!updated) close(false);
    else if (confirm("Are you sure you want to cancel ?")) close(false);
  };

  const [loading, setLoading] = useState(false);

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (updated) {
      let sDate = new Date(begin);
      let eDate = new Date(end);
      if (sDate > eDate) {
        toast.error("End Date can't be before Start Date");
      } else {
        const formData = new FormData();
        formData.append("files", imageRef.current.files[0]);
        setUpdated(false);
        setLoading(true);
        fileUpload
          .post("/api/upload/announcements", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const imagePath = response.data[0];
            const cookies = new Cookies();
            const storedAccessToken = cookies.get("access_token");
            supplairAPI
              .post(
                "/announcement-srv/private/create",
                {
                  imagePath: imagePath,
                  startDate: sDate.toISOString(),
                  endDate: eDate.toISOString(),
                },
                {
                  headers: {
                    Authorization: `Bearer ${storedAccessToken}`,
                  },
                }
              )
              .then((response) => {
                toast.success(response.data);
                setUpdateGet((prev) => !prev);
                close(false);
              })
              .catch((err) => {
                toast.error(err.message);
                setUpdated(true);
              });
          })
          .catch((err) => {
            toast.error(err.message);
            setUpdated(true);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [begin, setBegin] = useReducer(updateReducer, "");
  const [end, setEnd] = useReducer(updateReducer, "");
  const imageRef = useRef();

  return (
    <PopUp1 closeMe={closePopup} title="Add Announcement">
      <div className="p-4">
        <form onSubmit={handleAddAnnouncement}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Announcement Image :</span>
            <input type="file" placeholder="New User Name" required ref={imageRef} />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Begin Date :</span>
            <input
              type="date"
              required
              value={begin}
              onChange={(e) => setBegin(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>End Date :</span>
            <input
              type="date"
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>

          <div className="flex justify-end gap-5">
            <button onClick={closePopup} className="cancelBtn" type="button">
              Cancel
            </button>
            <input
              type="submit"
              value="Save"
              className={`${updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
            />
            {loading ? (
              <div className="pt-[6px]">
                <ClockLoader size={"30px"} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default AddAnnouncementPopup;
