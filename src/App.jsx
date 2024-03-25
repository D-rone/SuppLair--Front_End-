import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/mainRouter.jsx";

function App() {
  return (
    <>
      <div>Hello</div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
