import React, { useState } from "react";
import { validateCountry } from "../utils/api";
import useCartStore from "../stores/cartStore";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.css";
import { Invoice, Product } from "../types/types";
import Cart from "./Cart";
import { useSnackbar } from "notistack";

const CheckoutForm: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidCountry = await validateCountry(userData.country);
    if (!isValidCountry) {
      enqueueSnackbar("El país de envío no es válido", { variant: "error" });
      return;
    }

    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const updatedProducts = storedProducts.map((product: Product) => {
      const itemInCart = items.find((item) => item.id === product.id);
      if (itemInCart) {
        return { ...product, stock: product.stock - itemInCart.quantity };
      }
      return product;
    });

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    const invoice = {
      date: new Date().toISOString(),
      items: items,
      total: items.reduce((sum: number, item: Product) => sum + item.price, 0),
      user: userData,
    } as Invoice;
    const getInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
    getInvoices.push(invoice);
    localStorage.setItem("invoices", JSON.stringify(getInvoices));

    clearCart();
    enqueueSnackbar("Compra realizada con éxito", { variant: "success" });
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <Cart />
      {items.length > 0 && (
        <>
          <h2>Datos de facturación</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono:</label>
              <input
                type="tel"
                id="phone"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">País:</label>
              <input
                type="text"
                id="country"
                value={userData.country}
                onChange={(e) =>
                  setUserData({ ...userData, country: e.target.value })
                }
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={items.length === 0}
            >
              Finalizar Compra
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutForm;
