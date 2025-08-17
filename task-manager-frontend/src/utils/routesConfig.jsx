import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export const protectedRoutes = [{ path: "/tasks", element: <Tasks /> }];

export const fallbackRoute = { path: "*", element: <NotFound /> };
