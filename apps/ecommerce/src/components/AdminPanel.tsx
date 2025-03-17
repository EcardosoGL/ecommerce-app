import React from "react";
import { Invoice } from "../types/types";
import InvoiceComp from "./Invoice";
import "./AdminPanel.css";

const AdminPanel: React.FC = () => {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]") as Invoice[];

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      {invoices.length === 0 ? (
        <p className="no-invoices">No hay facturas registradas.</p>
      ) : (
        <div className="invoice-grid">
          {invoices.map((invoice, index) => (
            <InvoiceComp key={index} items={invoice.items} userData={invoice.user} date={invoice.date} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;