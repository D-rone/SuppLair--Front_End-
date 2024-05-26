import React, { useState, useEffect } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";

function UpdateAnnouncementPopup({ close, announcement }) {
  const [formData, setFormData] = useState({
    beginDate: "",
    endDate: "",
    type: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (announcement) {
      setFormData(announcement);
    }
  }, [announcement]);

  const closePopup = () => {
    if (
      !formData.beginDate &&
      !formData.endDate &&
      !formData.type &&
      !formData.description &&
      !formData.status
    ) {
      close(null);
    } else if (window.confirm("Are you sure you want to cancel?")) {
      close(null);
    }
  };

  const handleUpdateAnnouncement = (e) => {
    e.preventDefault();

    const beginDate = new Date(formData.beginDate);
    const endDate = new Date(formData.endDate);
    const now = new Date();

    if (beginDate >= endDate) {
      toast.error("End Date should be ahead of Begin Date.");
    } else if (endDate <= now) {
      toast.error("End Date should be in the future.");
    } else {
      close(formData);
      toast.success("Announcement updated");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <PopUp1 closeMe={closePopup} title="Update Announcement">
      <div className="p-4">
        <form onSubmit={handleUpdateAnnouncement}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Begin Date :</span>
            <input
              type="date"
              required
              name="beginDate"
              value={formData.beginDate}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>End Date :</span>
            <input
              type="date"
              required
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Type :</span>
            <input
              type="text"
              required
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Description :</span>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full h-24 px-6 py-3 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Status :</span>
            <select
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-5">
            <button onClick={closePopup} className="cancelBtn" type="button">
              Cancel
            </button>
            <input type="submit" value="Save" className="approveBtn" />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateAnnouncementPopup;
