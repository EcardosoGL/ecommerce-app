import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import useAuthStore from "./stores/authStore";
import AdminPanel from "./components/AdminPanel";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutForm from "./components/CheckoutForm";
import { mockData } from "./constants/mockData";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
  const { user } = useAuthStore();
  
  const mockDataShort = mockData.sort(() => 0.5 - Math.random()).slice(0, 10);

  useEffect(() => {
    if (user) {
      const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      if (storedProducts.length === 0) {
        localStorage.setItem("products", JSON.stringify(mockDataShort));
      }
    }
  }, [user, mockDataShort]);

  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;