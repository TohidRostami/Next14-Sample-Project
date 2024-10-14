"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { EditOutlined } from "@ant-design/icons";

import { useProducts } from "@/functions/functions";
import { SubmitHandler } from "react-hook-form";
import Product from "@/Types/Product";

import { useTranslation } from "react-i18next";
import Form from "./Form";
import MainModal from "./MainModal";

export default function EditModal({
  product,
  editModal,
  handleClose,
}: {
  product: Product | null;
  editModal: boolean;
  handleClose: () => void;
}) {
  const { mutateProd } = useProducts();
  const mutation = mutateProd(product as Product);

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
    <MainModal open={editModal}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {/* <EditIcon /> */}
        <EditOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("editProduct")}
      </Typography>
      <Form
        product={product}
        submitHandler={submitHandler}
        backHandler={handleClose}
        submitButtonText="editProduct"
      />
    </MainModal>
  );
}
