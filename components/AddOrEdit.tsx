import React from "react";
import EditModal from "./EditModal";
import CreatePost from "./CreatePost";
import Product from "@/Types/Product";

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
  if (pageIdentifier === "editModal")
    return (
      <EditModal
        categories={categories}
        editModal={editModal}
        handleClose={handleClose}
        product={product}
      />
    );

  return <CreatePost />;
};

export default AddOrEdit;
