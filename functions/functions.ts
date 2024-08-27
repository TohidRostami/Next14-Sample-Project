import Product from "../Models/Product";
import { useQuery, useMutation } from "@tanstack/react-query";

export function allProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });
}

export function getSingleProduct(id: string) {
  return useQuery({
    queryKey: ["prod"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
        res.json()
      ),
  });
}

export function mutateProd(prod: Product) {
  return useMutation<Product, Error, Product>({
    mutationFn: () => {
      return fetch(`https://fakestoreapi.com/products/${prod.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: prod.title,
          price: prod.price,
          description: prod.description,
          image: prod.image,
          category: prod.category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    onSuccess: () => {
      return console.log("SUCCESS!");
    },
  });
}

export function createProduct({
  title,
  price,
  category,
  description,
  image,
}: {
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}) {
  return fetch(`https://fakestoreapi.com/products`, {
    method: "POST",
    body: JSON.stringify({
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function deleteProduct(id: string) {
  return useMutation({
    mutationFn: () => {
      return fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());
    },
    onSuccess: () => {
      console.log("SUCCESS!");
    },
    onError: () => {
      throw new Error("Failed to fetch the data!");
    },
  });
}
