"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { mutateProd } from "@/functions/functions";
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
  categories,
}: {
  product: Product | null;
  editModal: boolean;
  handleClose: () => void;
  categories: string[];
}) {
  const mutation = mutateProd(product as Product);

  const { t } = useTranslation();

  const submitHandler: SubmitHandler<Product> = (data) => {
    console.log({
      data,
    });
    mutation.mutate(data);
    console.log("After Patch: ", data);
    handleClose();
  };

  return (
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
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("editProduct")}
            </Typography>
            <Form
              categories={categories}
              product={product}
              backHandler={handleClose}
              submitHandler={submitHandler}
              submitButtonText="submitEdit"
            />
          </Box>
        </Container>
      </Box>
    </Modal>
  );
}
