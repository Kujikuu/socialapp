import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthLayout from "./Components/AuthLayout";
import AppLayout from "./Components/AppLayout";
import Feed from "./Pages/Main/Feed";
import Notifications from "./Pages/Main/Notifications";
import Profile from "./Pages/Main/Profile";
import Settings from "./Pages/Main/Settings";
import NotFound from "./Pages/NotFound";
import { AuthProvidor } from "./hooks/AuthContext";
import { Offline } from "react-detect-offline";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "", element: <AuthLayout />, children: [
        { path: "login", element: <Navigate to="" replace /> },
        { path: "register", element: <Navigate to="" replace /> },
        { path: "*", element: <NotFound /> }
      ]
    }, {
      path: "main", element: <AppLayout />, children: [
        { index: true, element: <Feed /> },
        { path: "profile", element: <Profile /> },
        { path: "notifications", element: <Notifications /> },
        { path: "settings", element: <Settings /> },
        { path: "*", element: <NotFound /> }
      ]
    }
  ])
  return (
    <AuthProvidor>
      <RouterProvider router={router}></RouterProvider>
      <Offline>
        <p className="fixed bottom-2 right-2 bg-red-700 text-white rounded-xl px-4 py-3">
          You're offline now.
        </p>
      </Offline>
    </AuthProvidor>
  )
}
