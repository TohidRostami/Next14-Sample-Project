"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid } from "@mui/material";

const ContactUs = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message before sending.");
      return;
    }

    // Handle the logic to send the message (e.g., API call)
    alert(`Message sent: ${message}`);
    setMessage(""); // Clear the message input
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "lightGrey",
        borderRadius: 2,
        maxWidth: "800px",
        height: "300px",
        margin: "40px auto",
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: "40%",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          marginRight: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "white", fontWeight: "bold", fontFamily: "Permanent Marker, cursive", }}
        >
          Contact Us!
        </Typography>
        <Typography variant="body1" color="white" sx={{ marginLeft:"30px", marginTop:"20px" }}>
          Let us know your thoughts and opinions about our website. Your
          feedback helps us improve!
        </Typography>
      </Box>

      <Box sx={{width:"50%", display:"flex", flexDirection:"column", margin:"auto"}}>
        {/* Textarea */}
        <TextField
          label="Your Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
        />

        {/* Send Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{
            marginTop: 2,
            alignSelf: "flex-start",
            textTransform: "none",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "gray",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ContactUs;
