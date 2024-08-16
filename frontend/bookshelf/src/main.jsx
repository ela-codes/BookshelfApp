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
        path: '*', 
        element: <NotFound /> 
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
