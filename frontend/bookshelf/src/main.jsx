import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import "./index.css";
import SignUP from './sign-up.jsx';
import NotFound from './components/NotFound.jsx';
import Profile from './profile.jsx'
import User from './components/user.jsx'
import Home from './home.jsx'
import Moderator from './components/boardModerator.jsx'
import Unauthorized from './components/unauthorized.jsx'
import { AuthProvider } from "./context/AuthProvider.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Admin from './components/boardAdmin.jsx'

const ROLES ={
  'User' : 1,
  'Admin':2,
  'Moderator':3
}
const router = createBrowserRouter([
  // public routes
  {
    path: "/",
    element: <App />,
  },
  {
    path: '/sign-up',
    element: <SignUP />,
  },

  // protected routes
  {
    element: <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Moderator]} />, // All roles can access Home, Profile, User
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
  {
    element: <RequireAuth allowedRoles={[ROLES.Moderator]} />, // Only Moderators can access Moderator board
    children: [
      {
        path: "/boardModerator",
        element: <Moderator />,
      },
    ],
  },
  {
    element: <RequireAuth allowedRoles={[ROLES.Admin]} />, // Only Admins can access Admin board
    children: [
      {
        path: "/boardAdmin",
        element: <Admin />,
      },
    ],
  },

  // other
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '*',
    element: <NotFound />
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
