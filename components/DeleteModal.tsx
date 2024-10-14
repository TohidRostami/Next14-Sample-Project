"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DeleteOutlined } from "@ant-design/icons";

import { useProducts } from "@/functions/functions";
import Product from "@/Types/Product";

import { useTranslation } from "react-i18next";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainModal from "./MainModal";

export default function DeleteModal({
  product,
  deleteModal,
  handleClose,
}: {
  product: Product;
  deleteModal: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation();
  const { deleteProduct } = useProducts();
  const mutation = deleteProduct(`${product.id}`);

  const deleteHandler = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        handleClose(); // Close modal after success
      },
      onError: (error) => {
        console.error("Failed to update product:", error);
        toast.error("API error accoured!");
      },
    });
  };

  return (
    <MainModal open={deleteModal}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {/* <DeleteIcon /> */}
        <DeleteOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("deleteProduct")}
      </Typography>

      <Typography variant="h6" align="center">
        {t("deleteQuestion", { number: product.id })}
      </Typography>

      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid xs={7}>
          <Button
            type="button"
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, mr: 1, ml: 1, pr: 6, pl: 6 }}
          >
            {t("back")}
          </Button>
          <Button
            type="button"
            onClick={deleteHandler}
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2, pr: 6, pl: 6 }}
          >
            {t("delete")}
          </Button>
        </Grid>
      </Box>
    </MainModal>
  );
}
