import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/mainRouter.jsx";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setLoading(false);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  return  <RouterProvider router={router} />
}

export default App;
