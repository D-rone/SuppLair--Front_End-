import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useScreenContext } from "../../pages/HomePage";
import { ScaleLoader } from "react-spinners";

function HomeBody() {
  let { foldingSideBar, setSideBar } = useScreenContext();

  let closeSideBar = () => {
    setSideBar((old) => {
      if (old) return false;
    });
  };
  return (
    <div
      className={`relative h-_pageBody transition-all duration-300 ease-in-out flex items-center justify-center ${
        foldingSideBar ? "w-4/5 left-[20%]" : "w-full left-0"
      }`}
      onClick={closeSideBar}
    >
      <Suspense fallback={<ScaleLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeBody;
