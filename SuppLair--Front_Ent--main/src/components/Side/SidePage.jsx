import React, { useState } from "react";
import { useScreenContext } from "../../App";

export default function SidePage() {
  const { authSideBar } = useScreenContext();
  return (
    <>
      {authSideBar ? (
        <div className="relative pl-[5%] pr-[5%] flex flex-col items-center justify-center w-[50%] min-w-[400px] h-screen bg-supplair-secondary  ">
          <div className="absolute inset-0 bg-[url('src/assets/bg_img4.svg')] opacity-30"></div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center mb-4 mr-32">
              <img src="src/assets/logo2.png" alt="Logo" className="w-16 h-16 mr-4 " />
              <h2 className="text-4xl font-semibold text-white font-Raleway">SuppLair</h2>
            </div>
            <p className="text-xl text-white font-Raleway ">
              Orderly aims to revolutionize order management with streamlined processes and
              comprehensive reporting, empowering businesses to make informed decisions and nurture
              supplier relationships for success
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
