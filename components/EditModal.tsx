"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EditOutlined } from "@ant-design/icons";

import { useProducts } from "@/functions/functions";
import { Modal } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import Product from "@/Types/Product";

import { useTranslation } from "react-i18next";
import Form from "./Form";

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
  product: Product | null;
  editModal: boolean;
  handleClose: () => void;
}) {
  const { mutateProd, getCategories } = useProducts();
  const mutation = mutateProd(product as Product);

  const { data: categories, isLoading, isError } = getCategories();

  const { t } = useTranslation();

  const submitHandler: SubmitHandler<Product> = (data) => {
    console.log(data);
    mutation.mutate(data, {
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
        open={editModal}
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
                {/* <EditIcon /> */}
                <EditOutlined />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t("editProduct")}
              </Typography>
              <Form
                isLoading={isLoading}
                isError={isError}
                product={product}
                categories={categories}
                submitHandler={submitHandler}
                backHandler={handleClose}
                submitButtonText="addProduct"
              />
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
}
