"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getSingleProduct, mutateProd } from "@/functions/functions";
import { Modal } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Product from "@/Models/Product";

const defaultTheme = createTheme();

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function EditModal({
  product,
  editModal,
  handleClose,
}: {
  product: Product;
  editModal: boolean;
  handleClose: () => void;
}) {
  const mutation = mutateProd(product);

  const { handleSubmit, register } = useForm<Product>();

  const submitHandler: SubmitHandler<Product> = (data) => {
    console.log({
      data,
    });
    mutation.mutate(data);
    console.log("After Patch: ", data);
  };

  return (
    <Modal
      open={editModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
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
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Edit Product
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
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      defaultValue={product?.title}
                      autoFocus
                      {...register("title")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="price"
                      label="Price"
                      defaultValue={product?.price}
                      {...register("price")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      defaultValue={product?.description}
                      {...register("description")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Category"
                      id="category"
                      defaultValue={product?.category}
                      {...register("category")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Image"
                      id="image"
                      defaultValue={product?.image}
                      {...register("image")}
                    />
                  </Grid>
                </Grid>
                <Grid xs={7}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 3, ml: 3, pr: 6, pl: 6 }}
                    onClick={handleClose}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit Edit
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}
