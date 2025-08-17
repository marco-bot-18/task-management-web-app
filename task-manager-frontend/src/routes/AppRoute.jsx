import { Navigate, Route, Routes } from "react-router-dom";
import {
  fallbackRoute,
  protectedRoutes,
  publicRoutes,
} from "../utils/routesConfig";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoute() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" replace />} />

        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route element={<ProtectedRoute />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        <Route path={fallbackRoute.path} element={fallbackRoute.element} />
      </Routes>
    </main>
  );
}
