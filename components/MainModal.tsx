import React from "react";
import { Modal, Box, Container, CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";

interface ModalType {
  children: React.ReactNode;
  open: boolean;
}

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

const MainModal: React.FC<ModalType> = ({ children, open }) => {
  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
              {children}
            </Box>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default MainModal;
