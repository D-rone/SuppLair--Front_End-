import React, {
  createContext,
  useContext,
  useDebugValue,
  useEffect,
  useState,
} from "react";
import TopBar from "../components/home/TopBar";
import SideBar from "../components/home/SideBar";
import HomeBody from "../components/home/HomeBody";

import defaultProfilePic from "../assets/images/noProfilePic.png";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

let DUMMY_DATA = {
  name: "Mohamed Ouksili",
  profilePic: defaultProfilePic,
  email: "medouksili@gmail.com",
  permissions: ["ANNOUNCEMENT", "USERS", "BILLING", "SALES"],
  passwordLength: 9,
  companyName: "Test",
  website: "www.mohamed.com",
  address: "25 Rue Baghdadi Mohamed, Oran",
  phone: "+213-669-29-19-46",
  companyPic: defaultProfilePic,
  wilayas: [
    { name: "Oran", deliveryDate: "27/04/2023" },
    { name: "Sidi Bel Abbes", deliveryDate: "27/04/2023" },
    { name: "Setif", deliveryDate: "27/04/2023" },
    { name: "Relizane", deliveryDate: "27/04/2023" },
  ],
  regions: [
    { name: "East", deliveryDate: "27/04/2023" },
    { name: "Sud", deliveryDate: "27/04/2023" },
  ],
  sectors: [
    { name: "Oran Centre", deliveryDate: "27/04/2023" },
    { name: "Ain Oulemane", deliveryDate: "27/04/2023" },
    { name: "Ain trid", deliveryDate: "27/04/2023" },
    { name: "Braya", deliveryDate: "27/04/2023" },
    { name: "Timimoun", deliveryDate: "27/04/2023" },
  ],
};

function HomePage() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [userData, setUserData] = useState(null);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
    setUserData(DUMMY_DATA);
  }, []);

  let closeProfilePopUp = () => {
    setProfileDropdown((old) => {
      if (old) return false;
    });
  };

  return (
    <div>
      {loaded ? (
        <UserContext.Provider value={{ userData, setUserData }}>
          <TopBar
            profileDropdown={profileDropdown}
            setProfileDropdown={setProfileDropdown}
          />

          {/* Top Bar Spacer */}
          <div className="h-14"></div>
          <div
            className="relative flex font-raleway"
            onClick={closeProfilePopUp}
          >
            <SideBar />
            <HomeBody closeProfilePopUp={closeProfilePopUp} />
          </div>
        </UserContext.Provider>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
