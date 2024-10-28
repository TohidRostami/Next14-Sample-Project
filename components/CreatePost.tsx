"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useProducts } from "../functions/functions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import Product from "@/Types/Product";
import { useTranslation } from "react-i18next";
import Form from "./Form";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "../Store/hooks";

export default function CreatePost() {
  const { createProduct } = useProducts();

  const { t } = useTranslation();
  const router = useRouter();

  const value = useAppSelector((state) => state.category);

  console.log("FROM CREATE POST: ", value);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("SUCCESS!");
      router.push("/");
    },
    onError: () => {
      toast.error("API error accoured!");
    },
  });

  const backHandler = () => {
    router.push("/");
  };

  const submitHandler: SubmitHandler<Product> = (data) => {
    console.log(data);
    const parsedPrice = data.price.toString();
    console.log("toString PRICE: ", parsedPrice);
    mutation.mutate({
      title: data.title,
      price: parsedPrice,
      category: data.category,
      description: data.description,
      image: data.image,
    });
  };

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <AddIcon /> */}
            <PlusOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("addProduct")}
          </Typography>
          <Form
            product={null}
            submitHandler={submitHandler}
            backHandler={backHandler}
            submitButtonText="addProduct"
          />
        </Box>
      </Container>
    </>
  );
}
