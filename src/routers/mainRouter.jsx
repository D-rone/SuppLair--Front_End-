import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../components/auth/login/Login"));
const SignUp = lazy(() => import("../components/auth/signup/SignUp"));
const ResetPwd = lazy(() => import("../components/auth/reset-pwd/ResetPwd"));
const NotFound = lazy(() => import("../components/NotFound"));
const UserDetailsPage = lazy(() => import("../pages/UserDetailsPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
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
    ],
  },
  { path: "reset-password", element: <ResetPwd /> },
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },
  { path: "user-details", element: <UserDetailsPage /> },
  { path: "*", element: <NotFound /> },
]);
