import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductList from "../components/ProductList";
import { Product } from "../types/types";

describe("ProductList Component", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      quantity: 2,
      stock: 10,
      tax: 0.19,
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      quantity: 1,
      stock: 10,
      tax: 0.19,
      category: "Category 1",
    },
  ];

  beforeEach(() => {
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockProducts));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders products from localStorage", () => {
    render(<ProductList />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("handles empty localStorage", () => {
    Storage.prototype.getItem = vi.fn(() => null);

    render(<ProductList />);

    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
  });
});
