import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/signup/SignUp";
import ResetPwd from "../components/auth/reset-pwd/ResetPwd";
import NotFound from "../components/NotFound";
import UserDetailsPage from "../pages/UserDetailsPage";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
  { path: "home", element: <HomePage /> },
  
  { path: "reset-password", element: <ResetPwd /> },
  
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },
  { path: "user-details", element: <UserDetailsPage /> },

  { path: "*", element: <NotFound /> },
]);
