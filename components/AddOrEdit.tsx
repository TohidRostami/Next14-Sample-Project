import React from "react";
import EditModal from "./EditModal";
import CreatePost from "./CreatePost";
import Product from "@/Types/Product";

const AddOrEdit = ({
  pageIdentifier,
  product,
  editModal,
  handleClose,
}: {
  product: Product | null;
  editModal: boolean;
  handleClose: () => void;
  pageIdentifier: string;
}) => {
  if (pageIdentifier === "editModal")
    return (
      <EditModal
        editModal={editModal}
        handleClose={handleClose}
        product={product}
      />
    );

  return <CreatePost />;
};

export default AddOrEdit;
