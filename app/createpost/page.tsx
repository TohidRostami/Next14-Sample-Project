"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createProduct } from "@/functions/functions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Product from "@/Models/Product";

const defaultTheme = createTheme();

export default function CreatePost() {
  const router = useRouter();

  const { handleSubmit, register } = useForm<Product>();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("SUCCESS!");
      router.push("/");
    },
  });

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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(submitHandler)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("title")}
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  {...register("price")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  {...register("description")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Category"
                  id="category"
                  {...register("category")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Image"
                  id="image"
                  {...register("image")}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
