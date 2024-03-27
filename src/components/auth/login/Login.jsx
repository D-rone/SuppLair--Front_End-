import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../Side/SidePage";
library.add(faLock, faEnvelope);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    // Perform validation
    if (!email.trim() || !password.trim()) {
      alert("All fields are required");
      return;
    }

    // If validation passes, proceed with sign up process
    // Example: Send form data to server or perform any other necessary actions
    console.log("log in successful");
  };
  return (
    <>
      <div className="absolute top-0 right-0 mr-10 mt-2">
        <span className="font-bold font-Raleway ">Don't have an account ?</span>
        <a
          className="ml-2 text-supplair-primary font-bold font-Raleway"
          href="signup"
        >
          Sign up
        </a>
      </div>
      <div className="flex">
        <SidePage />

        <form onSubmit={handleLogin}>
          <div className="ml-28 mt-10 flex flex-col items-start">
            <h1 className="text-3xl text-center mt-20 mr-72 mb-10">Log in</h1>
            <div className="mt-4 flex flex-col items-center">
              <div className="relative flex items-center mb-5">
                <FontAwesomeIcon
                  className="absolute ml-3"
                  icon="fa-solid fa-envelope"
                />
                <input
                  className="w-96 h-10 border border-gray-300 rounded-xl pl-10 py-2 focus:outline-none focus:border-supplair-primary focus:border-2"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-96 h-10 mt-5 mb-2 bg-supplair-primary rounded-xl text-white"
                type="submit"
              >
                Login
              </button>
              <a
                className="mr-64 mt-2 text-supplair-primary"
                href="reset-password"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
