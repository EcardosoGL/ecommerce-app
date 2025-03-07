import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import "./Navbar.css";
import Login from "./Login";
import useCartStore from "../stores/cartStore";

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { clearCart } = useCartStore();

  const handlelogout = () => {
    logout();
    clearCart();
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Mi Ecommerce</Link>
      </div>
      <div className="navbar-links">
        {user?.role === "cliente" && <Link className="button-link" to="/checkout">Mi Compra</Link>}
        {user?.role === "admin" && <Link className="button-link" to="/admin">Administración</Link>}
      </div>
      <div className={`navbar-auth ${!user ? "logged-out" : ""}`}>
        {user ? (
          <button onClick={handlelogout} className="logout-button">
            Cerrar Sesión
          </button>
        ) : (
          <Login />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
