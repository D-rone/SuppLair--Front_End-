import React from "react";

export default function SidePage() {
  return (
    <>
      <div className="relative pl-10 pr-10 flex flex-col items-center justify-center w-[430px] h-screen bg-supplair-secondary">
        <div className="absolute inset-0 bg-[url('src/assets/bg_img4.svg')] opacity-30"></div>
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center mb-4 mr-32">
            <img
              src="src/assets/logo2.png"
              alt="Logo"
              className=" w-16 h-16 mr-4"
            />
            <h2 className="text-white text-4xl font-semibold font-Raleway">
              SuppLair
            </h2>
          </div>
          <p className="text-white font-Raleway text-xl ">
            Orderly aims to revolutionize order management with streamlined
            processes and comprehensive reporting, empowering businesses to make
            informed decisions and nurture supplier relationships for success
          </p>
        </div>
      </div>
    </>
  );
}
