import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { useProducts } from "../functions/functions";

const queryClient = new QueryClient();

test("should fetch products", () => {
  const Component = () => {
    const { getCategories } = useProducts();
    retn getCategories();
  };

  render(
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  );

  // Add your test assertions here
});
