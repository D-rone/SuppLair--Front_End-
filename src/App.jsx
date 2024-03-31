import { RouterProvider } from "react-router-dom";
import { router } from "./routers/mainRouter.jsx";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultProfilePic from "./assets/images/noProfilePic.png";

const ScreenContext = createContext();
export const useScreenContext = () => useContext(ScreenContext);

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

let DUMMY_DATA = {
  name: "Mohamed Ouksili",
  profilePic: defaultProfilePic,
  email: "medouksili@gmail.com",
  roles: ["Home", "Inventory"],
  passwordLength: 9,
};

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

  const [userData, setUserData] = useState(DUMMY_DATA);

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

    // Listeners Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ScreenContext.Provider
        value={{ showLogoText, foldingSideBar, sideBar, setSideBar, authSideBar }}
      >
        <UserContext.Provider value={{ userData, setUserData }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </ScreenContext.Provider>
      <ToastContainer />
    </>
  );
}

export default App;
