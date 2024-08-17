import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import "./index.css";
import SignUP from './sign-up.jsx';
import NotFound from './NotFound.jsx';
import Profile from './profile.jsx'
import User from './user.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
        path: '/sign-up',
        element: <SignUP />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
        path: '*', 
        element: <NotFound /> 
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
