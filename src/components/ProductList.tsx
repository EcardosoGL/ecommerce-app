import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") ?? "[]");
    setStoredProducts(storedProducts);
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
