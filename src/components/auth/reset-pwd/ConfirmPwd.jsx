import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../Side/SidePage";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
library.add(faLock);

export default function ConfirmPwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // Perform validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // If validation passes, proceed with saving the password
    // Add your logic here, such as sending a request to the server
    console.log("Password saved successfully");
    toast.success("Password saved successfully");
  };
  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">Already have an account ?</span>
        <NavLink to="/login" className="ml-2 font-bold text-supplair-primary font-Raleway">
          Log In
        </NavLink>
      </div>
      <div className="flex">
        <SidePage />
        <div className="flex flex-col items-center justify-center w-full h-screen pb-[12vh]">
          <h1 className="mt-20 mb-6 mr-40 text-3xl text-center">Forgot Password</h1>
          <form onSubmit={handleSave}>
            <div className="flex flex-col items-center mt-4">
              <div className="relative flex items-center mb-5">
                <FontAwesomeIcon className="absolute ml-3" icon="fa-solid fa-lock" />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative flex items-center mb-4">
                <FontAwesomeIcon className="absolute ml-3" icon="fa-solid fa-lock" />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="h-10 mt-5 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
