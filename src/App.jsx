import { RouterProvider } from "react-router-dom";
import { router } from "./routers/mainRouter.jsx";
import Login from "./components/auth/login/Login.jsx";
import SidePage from "./components/Side/SidePage.jsx";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
