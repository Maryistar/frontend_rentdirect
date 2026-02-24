import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../presentation/pages/Login";
import Register from "../presentation/pages/Register";
import Home from "../presentation/pages/Home";
import PropertyDetail from "../presentation/pages/PropertyDetail";
import Profile from "../presentation/pages/Profile";
import MyApplications from "../presentation/pages/MyApplications";
import MyProperties from "../presentation/pages/MyProperties";
import CreateProperty from "../presentation/pages/CreateProperty";

import ProtectedRoute from "../application/components/ProtectedRoute";

export default function AppRouter() {
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
          <ProtectedRoute allowedRoles={["tenant"]}>
            <MyApplications />
          </ProtectedRoute>
        }
      />

      {/* =====================
         OWNER
      ===================== */}
      <Route
        path="/my-properties"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <MyProperties />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-property"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <CreateProperty />
          </ProtectedRoute>
        }
      />

      {/* =====================
         PERFIL
      ===================== */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* =====================
         FALLBACK
      ===================== */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}