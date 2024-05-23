import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

function HomeBody() {
  return (
    <div className="relative h-_pageBody w-4/5 left-[20%]">
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-full">
            <ScaleLoader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}

export default HomeBody;
