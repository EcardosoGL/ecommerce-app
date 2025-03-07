import useCartStore from "../stores/cartStore";

const useCart = () => {
  return useCartStore();
};

export default useCart;