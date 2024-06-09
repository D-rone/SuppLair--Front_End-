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
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

function HomePage() {
  const navigate = useNavigate();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(false);
  const cookies = new Cookies();
  const storedAccessToken = cookies.get("access_token");
  const formData = new FormData();
  formData.append("token", storedAccessToken);

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/v1/auth/verify-token`, formData)
      .then((res) => {
        console.log(res.data.isValid);
        if (res.data.isValid == false) {
          navigate("/login", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (storedAccessToken) {
      axios
        .get(`http://localhost:8080/api/v1/user-details`, {
          headers: {
            Authorization: "Bearer " + storedAccessToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          setLoaded(true);
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/user-details`, {
        headers: {
          Authorization: "Bearer " + storedAccessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoaded(true);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  let closeProfilePopUp = () => {
    setProfileDropdown((old) => {
      if (old) return false;
    });
  };

  return (
    <div>
      {loaded ? (
        <UserContext.Provider
          value={{ userData, setUserData, reload, setReload }}
        >
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
            <HomeBody
              closeProfilePopUp={closeProfilePopUp}
              setLoaded={setLoaded}
            />
          </div>
        </UserContext.Provider>
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomePage;
