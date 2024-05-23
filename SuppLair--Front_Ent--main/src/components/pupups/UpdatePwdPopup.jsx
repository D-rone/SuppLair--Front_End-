import React, { useReducer, useState } from "react";
import PopUp1 from "./PopUp1";
import { toast } from "react-toastify";

function UpdatePwdPopup({ setShow }) {
  let closePwdUpdatePopup = () => {
    if (!updated) setShow(false);
    else if (confirm("Are you sure you want to cancel ?")) setShow(false);
  };
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (oldPwd.length < 8) {
      toast.error("Invalid old password");
    } else if (newPwd.length < 8) {
      toast.error("The minimum length of password should be 8");
    } else if (newPwd != confirmPwd) {
      toast.error("New Password and Confirm Password do not match");
    } else {
      setShow(false);
      toast.success("Password can be updated now");
    }
  };

  const [updated, setUpdated] = useState(false);
  const updateReducer = (state, newValue) => {
    setUpdated(true);
    return newValue;
  };

  const [oldPwd, setOldPwd] = useReducer(updateReducer, "");
  const [newPwd, setNewPwd] = useReducer(updateReducer, "");
  const [confirmPwd, setConfirmPwd] = useReducer(updateReducer, "");

  return (
    <PopUp1 closeMe={closePwdUpdatePopup} title="Update Password">
      <div className="p-4">
        <form onSubmit={handlePasswordUpdate}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Please fill your old password :</span>
            <input
              type="password"
              required
              placeholder="Old Password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 my-6 text-sm font-semibold">
            <span>Enter you new Password :</span>
            <input
              type="password"
              required
              placeholder="New Passowrd"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 my-6 text-sm font-semibold">
            <span>Confirm your new Passowrd :</span>
            <input
              type="password"
              required
              placeholder="Confirm new Password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex justify-end gap-5">
            <button onClick={closePwdUpdatePopup} className="cancelBtn" type="button">
              Cancel
            </button>
            <input
              type="submit"
              value="Update"
              className={`${updated ? `hover:cursor-pointer approveBtn` : "cancelBtn"} `}
            />
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdatePwdPopup;
