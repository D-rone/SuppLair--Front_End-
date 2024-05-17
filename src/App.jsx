import { RouterProvider } from "react-router-dom";
import { router } from "./routers/mainRouter.jsx";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScreenContext = createContext();
export const useScreenContext = () => useContext(ScreenContext);

function App() {

  // Show top par text logo
  const [showLogoText, setShowLogoText] = useState(false);
  // Display side bar in authentication pages
  const [authSideBar, setAuthSideBar] = useState(true);

  useEffect(() => {
    // Verify width of screen
    const handleResize = () => {
      let w900 = window.innerWidth >= 900;
      setShowLogoText(w900);
      setAuthSideBar(w900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Listeners Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ScreenContext.Provider
        value={{ showLogoText, authSideBar }}
      >
          <RouterProvider router={router} />
      </ScreenContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
