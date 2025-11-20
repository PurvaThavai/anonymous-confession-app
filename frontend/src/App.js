import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import { Stories } from "./components/Stories";
import { ensureSeedData } from "./utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";

ensureSeedData();

function App() {
  return (
    <Router>
      {/* Navbar on top */}
      <AppNavbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stories" element={<Stories />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-protected routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer at bottom */}
      <AppFooter />
    </Router>
  );
}

export default App;
