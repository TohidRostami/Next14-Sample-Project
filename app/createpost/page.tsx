"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createProduct } from "@/functions/functions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Product from "@/Types/Product";
import { useTranslation } from "react-i18next";
import fields from "@/Data/fields";

export default function CreatePost() {
  const { t } = useTranslation();
  const router = useRouter();

  const { handleSubmit, register } = useForm<Product>();

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
    const { title, price, category, description, image } = data;
    console.log("BEFORE ADD", {
      title,
      price,
      category,
      description,
      image,
    });

    mutation.mutate({
      title,
      price,
      category,
      description,
      image,
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
        <Box
          component="form"
          noValidate
          sx={{ mt: 3 }}
          onSubmit={handleSubmit(submitHandler)}
        >
          <Grid container spacing={2}>
            {fields.map((field) => {
              return (
                <Grid item xs={12} key={field.id}>
                  <TextField
                    {...register(field.register)}
                    required={field.required}
                    fullWidth
                    id={field.id}
                    label={t(field.label)}
                    autoFocus={field.autoFocus}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3 }}
          >
            {t("addProduct")}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
            onClick={backHandler}
          >
            {t("back")}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
