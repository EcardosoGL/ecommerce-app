import React from "react";
import useCartStore from "../stores/cartStore";
import "./Cart.css";
import { formatPercentage, formatTotal } from "utils-library-ecommerce-app";

const Cart: React.FC = () => {
  const { items, removeItem, updateItemQuantity } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 + item.tax),
    0
  );

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity > 0) {
      updateItemQuantity(productId, quantity);
    }
  };

  return (
    <div className="cart-container">
      <h2>Items en el carrito</h2>
      {items.length === 0 ? (
        <p className="empty-cart">El carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-name">{item.name}</div>
                <div className="item-price">{formatTotal(item.price)}</div>
                <div className="item-tax">
                  tax: {formatPercentage(item.tax)}
                </div>
                <div className="quantity-control-input">
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    max={item.stock}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                </div>
                <div className="container-button-delete">
                  <button
                    className="remove-item-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p className="total">Total: {formatTotal(total)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
