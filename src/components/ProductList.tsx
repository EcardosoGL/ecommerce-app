import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import "./ProductList.css";
import { mockData } from "../constants/mockData";

const ProductList: React.FC = () => {
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const mockDataShort = mockData.sort(() => 0.5 - Math.random()).slice(0, 10);
    if (storedProducts.length === 0) {
      localStorage.setItem("products", JSON.stringify(mockDataShort));
    }
    setStoredProducts(
      storedProducts.length === 0 ? mockDataShort : storedProducts
    );
  }, []);

  return (
    <div className="product-list">
      {storedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
