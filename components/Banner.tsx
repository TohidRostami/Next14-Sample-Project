"use client";
import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const Banner = () => {
  const images = [
    "https://images.unsplash.com/photo-1542598953-41310c43f54b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523027737707-96c0e1fd54e4?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1525980955931-afd2d0adf1c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1518077738226-1607ea7f1846?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]; // Replace with your own image URLs
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px", // You can adjust this height as needed
        overflow: "hidden",
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: `url(${images[currentIndex]}) center/cover no-repeat`,
          transition: "background 1s ease-in-out", // Smooth transition between images
        }}
      />

      {/* Navigation Buttons */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transform: "translateY(-50%)", // Vertically center the buttons
          padding: "0 16px",
        }}
      >
        <IconButton
          onClick={handlePrevious}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            ":hover": { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          }}
        >
          <ArrowBack />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            ":hover": { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Banner;
