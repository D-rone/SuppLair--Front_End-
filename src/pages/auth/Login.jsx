import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { supplairAPI } from "../../utils/axios";

library.add(faLock, faEnvelope);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await supplairAPI.post(
        "auth-srv/api/v1/auth/authenticate",
        {
          email: email,
          password: password,
        }
      );
      console.log("Response:", response.data);
      const { access_token, refresh_token } = response.data;
      document.cookie = `access_token=${access_token}; path=/`;
      document.cookie = `refresh_token=${refresh_token}; path=/`;
      toast.dismiss();
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.response.data, { autoClose: false });
      return;
    }
  };
  return (
    <>
      <div className="absolute top-0 right-0 mt-2 mr-10">
        <span className="font-semibold font-Raleway ">
          Don't have an account ?
        </span>
        <span></span>
        <a
          href="/signup"
          className="ml-2 font-bold text-supplair-primary font-Raleway"
        >
          Sign up
        </a>
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
              <a
                href="/reset-password"
                className="mt-2 mr-64 text-supplair-primary"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
