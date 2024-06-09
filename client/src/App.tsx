import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./components/layouts/header";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";

const router = createBrowserRouter([
  {
    errorElement: <div>Page not found!</div>,
  },
  {
    path: "/",
    element: (
      <>
        <Outlet />
        <Header />
      </>
    ),
    children: [
      {
        path: "/auth/signIn",
        element: <SignIn />,
      },
      {
        path: "/auth/signUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
