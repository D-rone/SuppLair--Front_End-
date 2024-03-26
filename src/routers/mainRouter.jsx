import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/signup/SignUp";
import ResetPwd from "../components/auth/reset-pwd/ResetPwd";
import NotFound from "../components/NotFound";
import UserDetailsPage from "../pages/UserDetailsPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../components/home/dashboard/Dashboard";
import Inventory from "../components/home/inventory/Inventory";
import Sales from "../components/home/sales/Sales";
import Announcements from "../components/home/announcements/Announcements";
import Users_Roles from "../components/home/users_roles/Users_Roles";
import Billing from "../components/home/billing/Billing";

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "inventory", element: <Inventory /> },
      { path: "sales", element: <Sales /> },
      { path: "announcements", element: <Announcements /> },
      { path: "users_roles", element: <Users_Roles /> },
      { path: "billing", element: <Billing /> },
    ],
  },
  { path: "reset-password", element: <ResetPwd /> },
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },
  { path: "user-details", element: <UserDetailsPage /> },
  { path: "*", element: <NotFound /> },
]);
