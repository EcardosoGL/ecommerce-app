import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/types";
import "./ProductList.css";

const ProductList: React.FC = () => {  
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);

  const storedProductsInLocalStorage = JSON.parse(localStorage.getItem("products") ?? "[]");

  useEffect(() => {    
    setStoredProducts(storedProductsInLocalStorage);
  }, [storedProductsInLocalStorage]);

  return (
    <div className="product-list">
      {storedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
