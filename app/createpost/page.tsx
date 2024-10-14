import AddOrEdit from "@/components/AddOrEdit";
import React from "react";

const CreatePostPage = () => {
  return (
    <AddOrEdit
      editModal={false}
      handleClose={() => {}}
      pageIdentifier=""
      product={null}
    />
  );
};

export default CreatePostPage;
