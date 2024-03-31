import { createBrowserRouter } from "react-router-dom";

import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import ResetPwd from "../pages/auth/ResetPwd";
import ConfirmPwd from "../pages/auth/ConfirmPwd";

import NotFound from "../components/NotFound";

import HomePage from "../pages/HomePage";
import { lazy } from "react";

const UserProfile = lazy(() => import("../components/profile/UserProfile"));

const PersonalProfile = lazy(() => import("../components/profile/PersonalProfile"));
const CompanyProfile = lazy(() => import("../components/profile/CompanyProfile"));

const Dashboard = lazy(() => import("../components/home/dashboard/Dashboard"));
const Products = lazy(() => import("../components/home/inventory/Products"));
const GroupProducts = lazy(() => import("../components/home/inventory/GroupProducts"));
const Orders = lazy(() => import("../components/home/sales/Orders"));
const Clients = lazy(() => import("../components/home/sales/Clients"));
const Announcements = lazy(() => import("../components/home/announcements/Announcements"));
const Users = lazy(() => import("../components/home/users_roles/Users"));
const Roles = lazy(() => import("../components/home/users_roles/Roles"));
const Billing = lazy(() => import("../components/home/billing/Billing"));

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
      {
        path: "user_profile",
        element: <UserProfile />,
        children: [
          { path: "personal_profile", element: <PersonalProfile /> },
          { path: "company_profile", element: <CompanyProfile /> },
        ],
      },
    ],
  },
  {
    path: "reset-password",
    element: <ResetPwd />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "confirm-password",
    element: <ConfirmPwd />,
  },

  { path: "*", element: <NotFound /> },
]);
