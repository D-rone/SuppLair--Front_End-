import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
//

    { path: "*", element: <NotFound /> },
]);
