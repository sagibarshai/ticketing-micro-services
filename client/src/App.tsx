import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Header from "./components/layouts/header";
import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Home from "./pages/home";
import SignOut from "./pages/auth/signOut";

const router = createBrowserRouter([
  {
    errorElement: <div>Page not found!</div>,
  },
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
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
      {
        path: "/auth/signOut",
        element: <SignOut />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
