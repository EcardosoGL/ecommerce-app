import { Meta, StoryFn } from "@storybook/react";
import Navbar from "../components/NavBar";
import { MemoryRouter } from "react-router-dom";
import { create } from "zustand";

interface AuthState {
    user: { role: "cliente" | "admin" } | null;
    login: (role: "cliente" | "admin") => void;
    logout: () => void;
  }

// Mock del store de autenticación
const useMockAuthStore = create<AuthState>(() => ({
  user: null,
  login: () => {},
  logout: () => {},
}));

// Mock del store del carrito
/* const useMockCartStore = create(() => ({
  clearCart: () => {},
})); */

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = () => (
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
);

export const LoggedOut = Template.bind({});
LoggedOut.args = {};

// Historia con usuario cliente
export const ClientUser = Template.bind({});
ClientUser.decorators = [
  (Story) => {
    useMockAuthStore.setState({ user: { role: "cliente" } });
    return <Story />;
  },
];

// Historia con usuario admin
export const AdminUser = Template.bind({});
AdminUser.decorators = [
  (Story) => {
    useMockAuthStore.setState({ user: { role: "admin" } });
    return <Story />;
  },
];
