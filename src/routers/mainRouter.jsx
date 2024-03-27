import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/signup/SignUp";
import ResetPwd from "../components/auth/reset-pwd/ResetPwd";
import NotFound from "../components/NotFound";
import ConfirmPwd from "../components/auth/reset-pwd/ConfirmPwd";

export const router = createBrowserRouter([
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },
  { path: "reset-password", element: <ResetPwd /> },
  { path: "confirm-password", element: <ConfirmPwd /> },

  { path: "*", element: <NotFound /> },
]);
