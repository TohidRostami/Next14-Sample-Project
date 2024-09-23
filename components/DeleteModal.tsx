"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { deleteProduct } from "@/functions/functions";
import Modal from "@mui/material/Modal";
import Product from "@/Types/Product";

import { useTranslation } from "react-i18next";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <>
      <ToastContainer />
      <Modal
        open={deleteModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
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
                <DeleteIcon />
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
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
