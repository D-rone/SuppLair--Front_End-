import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
library.add(faLock, faEnvelope);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      console.log("hi");
      toast.success("SuccessFull");
      return;
    }

    // If validation passes, proceed with sign up process
    // Example: Send form data to server or perform any other necessary actions
    console.log("log in successful");
  };
  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">
          Don't have an account ?
        </span>
        <NavLink
          to="/signup"
          className="ml-2 font-bold text-supplair-primary font-Raleway"
        >
          Sign up
        </NavLink>
      </div>
      <div className="flex">
        <SidePage />

        <div className="flex flex-col items-center justify-center w-full h-screen pb-[12vh]">
          <h1 className="mt-20 mb-10 text-3xl text-center mr-72">Log in</h1>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col items-center mt-4">
              <div className="relative flex items-center mb-5">
                <FontAwesomeIcon
                  className="absolute ml-3"
                  icon="fa-solid fa-envelope"
                />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative flex items-center mb-4">
                <FontAwesomeIcon
                  className="absolute ml-3"
                  icon="fa-solid fa-lock"
                />
                <input
                  className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="h-10 mt-5 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                type="submit"
              >
                Login
              </button>
              <NavLink
                className="mt-2 mr-64 text-supplair-primary"
                to="/reset-password"
              >
                Forgot Password?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
