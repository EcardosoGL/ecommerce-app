import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Invoice from "../components/Invoice";
import { Product, UserData } from "../types/types";
import { formatTotal } from "../utils/format";

vi.mock("../utils/format", () => ({
  formatDate: vi.fn(() => "2023-10-01"),
  formatTotal: vi.fn((amount: number) => `$${amount.toFixed(0)}`),
}));

describe("Invoice Component", () => {
  const mockUserData: UserData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123456789",
    country: "USA",
  };

  const mockItems: Product[] = [
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

  const mockDate = "2023-10-01";

  it("renders the invoice with user data and items", () => {
    render(
      <Invoice items={mockItems} userData={mockUserData} date={mockDate} />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("USA")).toBeInTheDocument();

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();

    expect(screen.getByText("$300")).toBeInTheDocument();
  });

  it("calculates the total correctly", () => {
    render(
      <Invoice items={mockItems} userData={mockUserData} date={mockDate} />
    );

    const total = mockItems.reduce(
      (sum: number, item: Product) => sum + item.price,
      0
    );
    expect(screen.getByText(`${formatTotal(total)}`)).toBeInTheDocument();
  });
});
