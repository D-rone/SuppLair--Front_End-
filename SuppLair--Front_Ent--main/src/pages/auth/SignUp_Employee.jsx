import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

library.add(faEnvelope, faLock, faBuilding);

export default function SignUp_Employee() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const extractEmailFromUrl = () => {
    const url = new URL(window.location.href);
    const segments = url.pathname.split("/");
    const email = segments.pop();
    setEmail(email);
  };
  useEffect(() => {
    extractEmailFromUrl();
  }, []);

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Perform validation
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/auth/authenticate-as-invited",
        {
          email: email,
          password: password,
        }
      );
      console.log("Response:", response.data);
      const { access_token, refresh_token } = response.data;
      document.cookie = `access_token=${access_token}; path=/`;
      document.cookie = `refresh_token=${refresh_token}; path=/`;
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("An error occurred");
      console.error("Error:", error);
    }

    toast.success("Sign up successful");
  };
  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">
          Already have an account ?
        </span>
        <NavLink
          to="/login"
          className="ml-2 font-bold text-supplair-primary font-Raleway"
        >
          Log In
        </NavLink>
      </div>
      <div className="flex">
        <SidePage />

        <div className="flex flex-col items-center justify-center w-full h-screen pb-[12vh]">
          <h1 className="mt-20 mb-6 mr-32 text-3xl text-center">
            Create an Account
          </h1>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col items-center mt-4">
              <div className="relative flex items-center mb-6">
                <FontAwesomeIcon
                  className="absolute ml-3"
                  icon="fa-solid fa-envelope"
                />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="text"
                  placeholder="Email Adress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                />
              </div>
              <div className="relative flex items-center mb-6">
                <FontAwesomeIcon
                  className="absolute ml-3.5"
                  icon="fa-solid fa-lock"
                />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="relative flex items-center mb-2">
                <FontAwesomeIcon
                  className="absolute ml-3.5"
                  icon="fa-solid fa-lock"
                />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="h-10 mt-5 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
