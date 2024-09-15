import React from "react";
import EditModal from "./EditModal";
import CreatePost from "./CreatePost";
import Product from "@/Types/Product";

// { pageIdentifier }: { pageIdentifier: string }
const AddOrEdit = ({
  pageIdentifier,
  product,
  editModal,
  handleClose,
  categories,
}: {
  product: Product | null;
  editModal: boolean;
  handleClose: () => void;
  categories: string[];
  pageIdentifier: string;
}) => {
  return (
    <>
      {pageIdentifier === "editModal" ? (
        <EditModal
          categories={categories}
          editModal={editModal}
          handleClose={handleClose}
          product={product}
        />
      ) : (
        <CreatePost />
      )}
    </>
  );
};

export default AddOrEdit;
