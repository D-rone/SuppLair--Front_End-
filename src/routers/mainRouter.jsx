import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/signup/SignUp";
import ResetPwd from "../components/auth/reset-pwd/ResetPwd";
import NotFound from "../components/NotFound";
import UserDetailsPage from "../pages/UserDetailsPage";
import HomePage from "../pages/HomePage";
import Dashboard from "../components/home/dashboard/Dashboard";
import Products from "../components/home/inventory/Products";
import GroupProducts from "../components/home/inventory/GroupProducts";
import Orders from "../components/home/sales/Orders";
import Clients from "../components/home/sales/Clients";
import Announcements from "../components/home/announcements/Announcements";
import Users from "../components/home/users_roles/Users";
import Roles from "../components/home/users_roles/Roles";
import Billing from "../components/home/billing/Billing";

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "group_products", element: <GroupProducts /> },
      { path: "orders", element: <Orders /> },
      { path: "clients", element: <Clients /> },
      { path: "announcements", element: <Announcements /> },
      { path: "users", element: <Users /> },
      { path: "roles", element: <Roles /> },
      { path: "billing", element: <Billing /> },
    ],
  },
  { path: "reset-password", element: <ResetPwd /> },
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },
  { path: "user-details", element: <UserDetailsPage /> },
  { path: "*", element: <NotFound /> },
]);
