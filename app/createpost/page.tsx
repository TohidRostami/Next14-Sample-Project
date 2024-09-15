import AddOrEdit from "@/components/AddOrEdit";
import CreatePost from "@/components/CreatePost";
import React from "react";

const CreatePostPage = () => {
  return (
    <AddOrEdit
      categories={[]}
      editModal={false}
      handleClose={() => {}}
      pageIdentifier=""
      product={null}
    />
  );
};

export default CreatePostPage;
