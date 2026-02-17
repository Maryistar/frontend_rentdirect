import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetail from "./pages/PropertyDetail";
import MyProperties from "./pages/MyProperties";
import MyApplications from "./pages/MyApplications";
import CreateProperty from "./pages/CreateProperty";
import Profile from "./pages/Profile";

export default function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar />

      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />

        {/* TENANT */}
        <Route
          path="/my-applications"
          element={
            token && user?.role === "tenant"
              ? <MyApplications />
              : <Navigate to="/login" />
          }
        />

        {/* OWNER */}
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

        {/* PERFIL */}
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />

        {/* CATCH ALL */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
