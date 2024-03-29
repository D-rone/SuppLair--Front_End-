import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

const SignUp = lazy(() => import("../pages/auth/SignUp"));
const SignUp_2 = lazy(() => import("../pages/auth/SignUp_2"));
const Login = lazy(() => import("../pages/auth/Login"));
const ResetPwd = lazy(() => import("../pages/auth/ResetPwd"));
const ConfirmPwd = lazy(() => import("../pages/auth/ConfirmPwd"));

import NotFound from "../components/NotFound";
import { ScaleLoader } from "react-spinners";

const HomePage = lazy(() => import("../pages/HomePage"));
const UserProfile = lazy(() => import("../components/profile/UserProfile"));

const Dashboard = lazy(() => import("../components/home/dashboard/Dashboard"));
const Products = lazy(() => import("../components/home/inventory/Products"));
const GroupProducts = lazy(() =>
  import("../components/home/inventory/GroupProducts")
);
const Orders = lazy(() => import("../components/home/sales/Orders"));
const Clients = lazy(() => import("../components/home/sales/Clients"));
const Announcements = lazy(() =>
  import("../components/home/announcements/Announcements")
);
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
      { path: "user_profile", element: <UserProfile /> },
    ],
  },
  {
    path: "reset-password",
    element: (
      <Suspense fallback={<LoadingScreenAuth />}>
        <ResetPwd />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<LoadingScreenAuth />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "signup2",
    element: (
      <Suspense fallback={<LoadingScreenAuth />}>
        <SignUp_2 />
      </Suspense>
    ),
  },

  {
    path: "login",
    element: (
      <Suspense fallback={<LoadingScreenAuth />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "confirm-password",
    element: (
      <Suspense fallback={<LoadingScreenAuth />}>
        <ConfirmPwd />
      </Suspense>
    ),
  },

  { path: "*", element: <NotFound /> },
]);

function LoadingScreenAuth() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <ScaleLoader />
    </div>
  );
}
