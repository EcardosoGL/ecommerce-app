import { Meta, StoryFn } from "@storybook/react";
import Invoice from "../components/Invoice";

export default {
  title: "Components/Invoice",
  component: Invoice,
} as Meta<typeof Invoice>;

const Template: StoryFn<typeof Invoice> = (args) => <Invoice {...args} />;

export const DefaultInvoice = Template.bind({});
DefaultInvoice.args = {
  userData: {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+1 123 456 7890",
    country: "México",
  },
  date: new Date().toISOString(),
  items: [
    { id: 1, name: "Producto A", price: 100, quantity: 2, tax: 0.16, stock: 10, category: "Categoría A" },
    { id: 2, name: "Producto B", price: 50, quantity: 1, tax: 0.16, stock: 10, category: "Categoría B" },
  ],
};

export const EmptyInvoice = Template.bind({});
EmptyInvoice.args = {
  userData: {
    name: "Ana Gómez",
    email: "ana.gomez@example.com",
    phone: "+1 987 654 3210",
    country: "Argentina",
  },
  date: new Date().toISOString(),
  items: [],
};
