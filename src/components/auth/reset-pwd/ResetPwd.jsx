import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../Side/SidePage";
library.add(faEnvelope);

export default function ResetPwd() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const handleClick = () => {
    // Perform validation
    if (!email.trim()) {
      alert("Email address is required");
      return;
    }
    // Regular expression to check if the email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("Please enter a valid email address");
      return;
    }
    // Perform further verification logic here, such as sending a request to the server
    // For demonstration purposes, let's assume verification is successful
    // You can replace this with actual verification logic
    // If verification is successful, navigate to the next step
    navigate("/confirm-password");
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
        <div className="ml-28 mt-32">
          <h1 className="text-3xl text-center  mt-20 mr-40 mb-6">
            Forgot Password
          </h1>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative flex items-center mb-2">
              <FontAwesomeIcon
                className="absolute ml-3"
                icon="fa-solid fa-envelope"
              />
              <input
                className="w-96 h-10 border border-gray-300 rounded-xl pl-10 py-2 focus:outline-none focus:border-supplair-primary focus:border-2"
                type="email"
                placeholder="Email Adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="w-96 h-10 mt-2 mb-2 bg-supplair-primary rounded-xl text-white"
              onClick={handleClick}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
