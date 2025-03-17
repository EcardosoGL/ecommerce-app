import { Meta, StoryFn } from "@storybook/react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/types";
import { SnackbarProvider } from "notistack";

export default {
  title: "Components/ProductCard",
  component: ProductCard,
  argTypes: {
    product: { control: "object" },
  },
} as Meta<typeof ProductCard>;

// Producto de ejemplo
const sampleProduct: Product = {
  id: 1,
  name: "Ejemplo de Producto",
  category: "Categoría",
  price: 1999.99,
  stock: 5,
  tax: 0.21,
  quantity: 1,
};

const Template: StoryFn<typeof ProductCard> = (args) => (
  <SnackbarProvider maxSnack={3}>
    <ProductCard {...args} />
  </SnackbarProvider>
);

export const Default = Template.bind({});
Default.args = {
  product: sampleProduct,
};
