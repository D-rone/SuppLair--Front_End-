import React from "react";

function PopUp1({ closeMe, title, children }) {
  let stop_propagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-supplair-popUpOverlay"
      onClick={closeMe}
    >
      <div
        className="h-fit min-h-[300px] max-w-[600px] w-[30%] bg-white min-w-[400px] rounded-xl"
        onClick={stop_propagation}
      >
        <div className="flex items-center text-lg font-semibold text-white rounded-t-xl h-14 bg-supplair-primary">
          <h2 className="mt-1 ml-6">{title}</h2>
        </div>
        <div className="p-4 rounded-b-xl">{children}</div>
      </div>
    </div>
  );
}

export default PopUp1;
