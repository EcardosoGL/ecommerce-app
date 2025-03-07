import React, { useState } from "react";
import { Product } from "../types/types";
import useCartStore from "../stores/cartStore";
import "./ProductCard.css";
import { formatTotal } from "../utils/format";
import { useSnackbar } from "notistack";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (isProductAddedToCart || product.stock <= 0) return;
    if (quantity > 0 && quantity <= product.stock) {
      addItem({ ...product, quantity });
      setQuantity(1);
    } else {
      enqueueSnackbar("Cantidad no válida", { variant: "error" });
    }
  };

  const isProductAddedToCart = useCartStore((state) =>
    state.items.some((item) => item.id === product.id)
  );

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">Precio: {formatTotal(product.price)}</p>
      <p className="product-stock">Stock: {product.stock}</p>
      <div className="quantity-control">
        <label htmlFor={`quantity-${product.id}`}>Cantidad:</label>
        <input
          type="number"
          id={`quantity-${product.id}`}
          value={quantity}
          min="1"
          max={product.stock}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>
      <button
        className={`add-to-cart-button ${
          (isProductAddedToCart || product.stock <= 0) && "disabled-button"
        }`}
        onClick={handleAddToCart}
        disabled={isProductAddedToCart}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
