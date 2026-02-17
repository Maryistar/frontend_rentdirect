import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PropertyDetail from "../pages/PropertyDetail";
import Profile from "../pages/Profile";
import MyApplications from "../pages/MyApplications";
import MyProperties from "../pages/MyProperties";
import CreateProperty from "../pages/CreateProperty";

export default function AppRouter() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* =====================
         RUTAS PÚBLICAS
      ===================== */}
      <Route path="/" element={<Home />} />
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* =====================
         TENANT
      ===================== */}
      <Route
        path="/applications"
        element={
          token && user?.role === "tenant"
            ? <MyApplications />
            : <Navigate to="/login" />
        }
      />

      {/* =====================
         OWNER
      ===================== */}
      <Route
        path="/my-properties"
        element={
          token && user?.role === "owner"
            ? <MyProperties />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/create-property"
        element={
          token && user?.role === "owner"
            ? <CreateProperty />
            : <Navigate to="/login" />
        }
      />

      {/* =====================
         PERFIL
      ===================== */}
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />

      {/* =====================
         FALLBACK
      ===================== */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
