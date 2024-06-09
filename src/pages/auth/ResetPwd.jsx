import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { toast } from "react-toastify";
library.add(faEnvelope);
import axios from "axios";
import { ScaleLoader } from "react-spinners";

export default function ResetPwd() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation
    if (!email.trim()) {
      toast.error("Email address is required", { autoClose: false });
      return;
    }
    // Regular expression to check if the email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address", { autoClose: false });
      return;
    }
    setLoaded(!loaded);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/send-email",
        {
          email: email,
        }
      );
      toast.dismiss();
      toast.success("Check your email", { autoClose: false });
      setLoaded(false);
    } catch (error) {
      toast.error(error.response.data, { autoClose: false });
      setLoaded(false);
    } finally {
    }
  };
  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">
          Already have an account ?
        </span>
        <span> </span>
        <a
          href="/login"
          className="ml-2 font-bold text-supplair-primary font-Raleway"
        >
          Log In
        </a>
      </div>
      <div className="flex">
        <SidePage />
        <div className="flex flex-col items-center justify-center w-full h-screen pb-[12vh]">
          <h1 className="mt-20 mb-6 mr-40 text-3xl text-center">
            Forgot Password
          </h1>
          <div className="flex flex-col items-center mt-4">
            {loaded ? (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)", // Corrected
                }}
              >
                <ScaleLoader />
              </div>
            ) : null}
            <form onSubmit={handleSubmit}>
              <div className="relative flex items-center mb-2">
                <FontAwesomeIcon
                  className="absolute ml-3"
                  icon="fa-solid fa-envelope"
                />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="text"
                  placeholder="Email Adress"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className="h-10 mt-2 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                type="submit"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
