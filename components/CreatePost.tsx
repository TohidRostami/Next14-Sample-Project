"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createProduct, getCategories } from "@/functions/functions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import Product from "@/Types/Product";
import { useTranslation } from "react-i18next";
import Form from "./Form";

export default function CreatePost() {
  const { data: categories } = getCategories();

  const { t } = useTranslation();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("SUCCESS!");
      router.push("/");
    },
  });

  const backHandler = () => {
    router.push("/");
  };

  const submitHandler: SubmitHandler<Product> = (data) => {
    mutation.mutate({
      title: data.title,
      price: data.price,
      category: data.category,
      description: data.description,
      image: data.image,
    });
  };

  return (
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
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("addProduct")}
        </Typography>
        <Form
          product={null}
          categories={categories}
          submitHandler={submitHandler}
          backHandler={backHandler}
          submitButtonText="addProduct"
        />
      </Box>
    </Container>
  );
}
