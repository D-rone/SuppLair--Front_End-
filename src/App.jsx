import { RouterProvider } from "react-router-dom";
import { router } from "./routers/mainRouter.jsx";
import { createContext, startTransition, useContext, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ScreenContext = createContext();
export const useScreenContext = () => useContext(ScreenContext);

function App() {
  // Page Loading State
  const [loading, setLoading] = useState(true);
  // Folding side bar mode
  const [foldingSideBar, setFoldingSideBar] = useState(true);
  // Open and Close Side Bar -- in folding side bar mode --
  const [sideBar, setSideBar] = useState(false);
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
      setFoldingSideBar(window.innerWidth >= 1100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Check if app is loading
    window.onload = () => {
      startTransition(() => {
        setLoading(false);
      });
    };

    // Listeners Cleanup
    return () => {
      window.onload = null;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ScreenContext.Provider
          value={{ showLogoText, foldingSideBar, sideBar, setSideBar, authSideBar }}
        >
          <RouterProvider router={router} />
        </ScreenContext.Provider>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
