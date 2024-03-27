import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../Side/SidePage";
library.add(faLock);

export default function ConfirmPwd() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSave = () => {
    // Perform validation
    if (!password.trim() || !confirmPassword.trim()) {
      alert("Please enter both passwords");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // If validation passes, proceed with saving the password
    // Add your logic here, such as sending a request to the server
    console.log("Password saved successfully");
    alert("Password saved successfully");
  };
  return (
    <>
      <div className="absolute top-0 right-0 mr-10 mt-2">
        <span className="font-semibold font-Raleway ">
          Already have an account ?
        </span>
        <a
          className="ml-2 text-supplair-primary font-bold font-Raleway"
          href="login"
        >
          Log In
        </a>
      </div>
      <div className="flex">
        <SidePage />
        <div className="ml-28 mt-24">
          <h1 className="text-3xl text-center  mt-20 mr-40 mb-6">
            Forgot Password
          </h1>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative flex items-center mb-5">
              <FontAwesomeIcon
                className="absolute ml-3"
                icon="fa-solid fa-lock"
              />
              <input
                className="w-96 h-10 border border-gray-300 rounded-xl pl-10 py-2 focus:outline-none focus:border-supplair-primary focus:border-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="relative flex items-center mb-4">
              <FontAwesomeIcon
                className="absolute ml-3"
                icon="fa-solid fa-lock"
              />
              <input
                className="w-96 h-10 border border-gray-300 rounded-xl pl-10 py-2 focus:outline-none focus:border-supplair-primary focus:border-2"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="w-96 h-10 mt-5 mb-2 bg-supplair-primary rounded-xl text-white"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
