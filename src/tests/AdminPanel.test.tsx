import { describe, test, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AdminPanel from "../components/AdminPanel";
import { Invoice } from "../types/types";

const mockLocalStorage = (invoices: Invoice[]) => {
  localStorage.setItem("invoices", JSON.stringify(invoices));
};

describe("AdminPanel Component", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("muestra el mensaje 'No hay facturas registradas.' cuando no hay facturas", () => {
    mockLocalStorage([]);

    render(<AdminPanel />);

    expect(
      screen.getByText("No hay facturas registradas.")
    ).toBeInTheDocument();
  });

  test("muestra las facturas correctamente cuando hay datos en el localStorage", () => {
    const mockInvoices: Invoice[] = [
      {
        total: 5000,
        date: "2023-10-01",
        items: [
          {
            id: 2,
            name: "Manzana Verde",
            category: "Frutas Frescas",
            stock: 29,
            price: 3000,
            tax: 0,
            quantity: 5,
          },
          {
            id: 1,
            name: "Manzana Roja",
            category: "Frutas Frescas",
            stock: 47,
            price: 2000,
            tax: 0.19,
            quantity: 3,
          },
        ],
        user: {
          name: "Juan Pérez",
          email: "juan@example.com",
          phone: "123456789",
          country: "Colombia",
        },
      },
    ];
    mockLocalStorage(mockInvoices);

    render(<AdminPanel />);

    expect(screen.getByText("Panel de Administración")).toBeInTheDocument();

    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
    expect(screen.getByText("Manzana Roja")).toBeInTheDocument();
    expect(screen.getByText("Manzana Verde")).toBeInTheDocument();
  });
});
