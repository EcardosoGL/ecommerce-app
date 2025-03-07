import React from "react";
import "./Invoice.css";
import { Product, InvoiceProps } from "../types/types";
import { formatDate, formatTotal } from "../utils/format";

const Invoice: React.FC<InvoiceProps> = ({ items, userData, date }) => {
  const total = items.reduce((sum:number, item:Product) => sum + item.price, 0);

  return (
    <div className="invoice-container">
      <h2>Factura de Compra</h2>
      <div className="invoice-details">
        <div className="user-info">
          <h3>Información del Cliente</h3>
          <p>
            <strong>Nombre:</strong> {userData.name}
          </p>
          <p>
            <strong>Correo:</strong> {userData.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {userData.phone}
          </p>
          <p>
            <strong>País:</strong> {userData.country}
          </p>
          <p>
            <strong>Fecha:</strong> {formatDate(new Date(date))}
          </p>
        </div>
        <div className="invoice-items">
          <h3>Detalles de la Compra</h3>
          <table>
            <thead>
              <tr>
                <th>Producto</th>                
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="quantity">{item.quantity}</td>                  
                  <td>{formatTotal(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total">
            <strong>Total:</strong> {formatTotal(total)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;