import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import HomePage from "./screens/HomePage";
import Profile from "./screens/Profile";
import Cart from "./screens/Cart";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/main",
      element: <HomePage />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/cart",
      element: <Cart />
    }
  ];

  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default AppRoutes;
