import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../Side/SidePage";
library.add(faEnvelope, faLock, faBuilding);

export default function SignUp() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Function to handle form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    // Perform validation
    if (
      !companyName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // If validation passes, proceed with sign up process
    // Example: Send form data to server or perform any other necessary actions
    console.log("Sign up successful");
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

        <div className="ml-28 mt-10">
          <h1 className="text-3xl text-center  mt-20 mr-32 mb-6">
            Create an Account
          </h1>
          <form onSubmit={handleSignUp}>
            <div className="mt-4 flex flex-col items-center">
              <div className="relative flex items-center mb-2">
                <FontAwesomeIcon
                  className="absolute ml-3.5"
                  icon="fa-solid fa-building"
                />
                <input
                  className="w-96 h-10 border border-gray-300 rounded-xl pl-10 py-2 focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
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
              <div className="relative flex items-center mb-2">
                <FontAwesomeIcon
                  className="absolute ml-3.5"
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
                  className="absolute ml-3.5"
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
