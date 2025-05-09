"use client";
import React, { useState } from "react";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useProducts } from "@/functions/functions";

const ProductCategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

  const { getCategories } = useProducts();
  const { data: catData } = getCategories();

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (catData && prevIndex + cardsToShow < catData.length) {
        return prevIndex + 1;
      } else {
        return 0; // Wrap around to the start
      }
    });
  };

  // Handle previous button click
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex - 1 >= 0) {
        return prevIndex - 1;
      } else {
        return catData ? catData.length - cardsToShow : 0;
      }
    });
  };

  return (
    <Box sx={{ width: "100%", padding: 2, position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
        <Typography
          style={{
            fontFamily: "Permanent Marker, cursive",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "black",
          }}
        >
          Categories
        </Typography>
      </Box>
      {/* Slider container */}
      <Box
        sx={{
          display: "flex",
          overflow: "hidden", // Hide anything outside the visible area
          transition: "transform 0.5s ease", // Smooth transition
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 80px",
        }}
      >
        {/* Render the visible cards based on currentIndex */}
        {catData &&
          catData
            .slice(currentIndex, currentIndex + cardsToShow)
            .map((category, index) => (
              <Card
                key={index}
                sx={{
                  height: 300,
                  width: 300,
                  margin: "10px 10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "black",
                  borderRadius: 10,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    fontFamily: "Permanent Marker, cursive",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    color: "white",
                  }}
                >
                  {category}
                </Typography>
              </Card>
            ))}
      </Box>

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
          transform: "translateY(-50%)",
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

export default ProductCategorySlider;
