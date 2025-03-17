export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  tax: number;
  quantity: number;
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  country: string;
}

export interface Invoice {
  date: string;
  items: Product[];
  total: number;
  user: UserData;
}

export interface InvoiceProps {
  items: Product[];
  userData: UserData;
  date: string;
}

export interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export interface AuthState {
  user: { role: "cliente" | "admin" } | null;
  login: (role: "cliente" | "admin") => void;
  logout: () => void;
}

export interface Country {
  name: {
    common: string;
  };
}
