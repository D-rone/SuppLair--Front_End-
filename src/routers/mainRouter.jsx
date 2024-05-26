import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom";
import { lazy, useEffect } from "react";

const SignUp = lazy(() => import("../pages/auth/SignUp"));

const SignUp_2 = lazy(() => import("../pages/auth/SignUp_2"));

const SignUp_3 = lazy(() => import("../pages/auth/SignUp_3"));

const SignUp_Employee = lazy(() => import("../pages/auth/SignUp_Employee"));

const Login = lazy(() => import("../pages/auth/Login"));
const ResetPwd = lazy(() => import("../pages/auth/ResetPwd"));
const ConfirmPwd = lazy(() => import("../pages/auth/ConfirmPwd"));

import NotFound from "../components/NotFound";

import HomePage, { useUserContext } from "../pages/HomePage";
import Forbidden from "../components/Forbidden";

const SuperAdmin = lazy(() => import("../components/super-admin/SuperAdmin"));

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

const SuperAdminAccounts = lazy(() => import("../components/super-admin/accounts/Accounts"));
const SuperAdminUsers = lazy(() => import("../components/super-admin/users/Users"));
const SuperAdminBilling = lazy(() => import("../components/super-admin/billing/Billing"));

function CheckPermission({ requiredPermission, children }) {
  const { userData } = useUserContext();
  const { permissions } = userData;
  if (permissions.includes(requiredPermission)) return children;
  else {
    return <Navigate to={"/forbidden"} replace />;
  }
}

function CheckSuperAdmin() {
  const { userData } = useUserContext();
  const { permissions } = userData;
  console.log(permissions);
  if (permissions.includes("SUPERADMIN")) {
    <Navigate to={"super-admin_accounts"} />
  } else {
    if (permissions.includes("HOME")) return <Dashboard />;
    if (permissions.includes("INVENTORY")) return <Navigate to={"products"} />;
    if (permissions.includes("SALES")) return <Navigate to={"orders"} />;
    if (permissions.includes("ANNOUNCEMENT")) return <Navigate to={"announcements"} />;
    if (permissions.includes("USERS")) return <Navigate to={"users"} />;
    if (permissions.includes("BILLING")) return <Navigate to={"billing"} />;
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <CheckSuperAdmin />,
      },
      {
        path: "super-admin_accounts",
        element: (
          <CheckPermission requiredPermission={"SUPERADMIN"}>
            <SuperAdminAccounts />
          </CheckPermission>
        ),
      },
      {
        path: "super-admin_users",
        element: (
          <CheckPermission requiredPermission={"SUPERADMIN"}>
            <SuperAdminUsers />
          </CheckPermission>
        ),
      },
      {
        path: "super-admin_billing",
        element: (
          <CheckPermission requiredPermission={"SUPERADMIN"}>
            <SuperAdminBilling />
          </CheckPermission>
        ),
      },

      {
        path: "products",
        element: (
          <CheckPermission requiredPermission={"INVENTORY"}>
            <Products />
          </CheckPermission>
        ),
      },
      {
        path: "group_products",
        element: (
          <CheckPermission requiredPermission={"INVENTORY"}>
            <GroupProducts />
          </CheckPermission>
        ),
      },
      {
        path: "orders",
        element: (
          <CheckPermission requiredPermission={"SALES"}>
            <Orders />
          </CheckPermission>
        ),
      },
      {
        path: "clients",
        element: (
          <CheckPermission requiredPermission={"SALES"}>
            <Clients />
          </CheckPermission>
        ),
      },
      {
        path: "announcements",
        element: (
          <CheckPermission requiredPermission={"ANNOUNCEMENT"}>
            <Announcements />
          </CheckPermission>
        ),
      },
      {
        path: "users",
        element: (
          <CheckPermission requiredPermission={"USERS"}>
            <Users />
          </CheckPermission>
        ),
      },
      {
        path: "roles",
        element: (
          <CheckPermission requiredPermission={"USERS"}>
            <Roles />
          </CheckPermission>
        ),
      },
      {
        path: "billing",
        element: (
          <CheckPermission requiredPermission={"BILLING"}>
            <Billing />
          </CheckPermission>
        ),
      },

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
    path: "signup2",
    element: <SignUp_2 />,
  },
  {
    path: "signup3",
    element: <SignUp_3 />,
  },
  {
    path: "signup_employee",
    element: <SignUp_Employee initialEmail="medouksili@gmail.com" />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "confirm-password",
    element: <ConfirmPwd />,
  },

  { path: "forbidden", element: <Forbidden /> },

  { path: "*", element: <NotFound /> },
]);
