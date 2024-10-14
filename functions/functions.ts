import Product from "../Types/Product";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useProducts = () => {
  const allProducts = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  });

 const productKeyes = () => {
  const prod = fetch('https://fakestoreapi.com/products/1')
  .then(res=>res.json())
  .then(json=>console.log(json))
  const keys = Object.keys(prod);
  return keys;
  };

  const getSingleProduct = (id: string) =>
    useQuery({
      queryKey: ["prod"],
      queryFn: () =>
        fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
          res.json()
        ),
    });

  const mutateProd = (prod: Product) =>
    useMutation<Product, Error, Product>({
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
    });

  const createProduct = ({
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
  }) =>
    fetch(`https://fakestoreapi.com/products`, {
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

  const deleteProduct = (id: string) =>
    useMutation({
      mutationFn: () => {
        return fetch(`https://fakestoreapi.com/products/${id}`, {
          method: "DELETE",
        }).then((res) => res.json());
      },
    });

  const getCategories = () =>
    useQuery<string[]>({
      queryKey: ["categories"],
      queryFn: () =>
        fetch("https://fakestoreapi.com/products/categories").then((res) =>
          res.json()
        ),
    });

  return {
    allProducts,
    getSingleProduct,
    mutateProd,
    createProduct,
    deleteProduct,
    getCategories,
  };
};
