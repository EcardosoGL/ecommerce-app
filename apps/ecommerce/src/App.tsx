import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import ProductList from "./components/ProductList";
import AdminPanel from "./components/AdminPanel";
import Cart from "./components/Cart";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutForm from "./components/CheckoutForm";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => {
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
        </Routes>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
