"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useProducts } from "@/functions/functions";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const ProductSlideshow = () => {
  const { allProducts } = useProducts();
  const { data, isLoading } = allProducts; // Fetch products using the custom hook
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsToShow = 4; // Number of cards to show at a time
  const totalSlides = data?.length
    ? Math.ceil(data.length / productsToShow)
    : 0;

  // Reset currentIndex when data changes
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(0);
    }
  }, [totalSlides]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, totalSlides]);

  // Go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Go to the previous slide
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Go to a specific slide
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate visible products for the current slide
  const visibleProducts =
    (data?.length ?? 0) > 0
      ? (data ?? []).slice(
          currentIndex * productsToShow,
          currentIndex * productsToShow + productsToShow
        )
      : [];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        margin: "40px auto",
      }}
    >
      {/* Loading Spinner */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
          >
            <Typography
              style={{
                fontFamily: "Permanent Marker, cursive",
                fontWeight: "bold",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              Products
            </Typography>
          </Box>

          {/* Product Cards */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              height: "80%",
              transition: "transform 1.0s ease-in-out",
            }}
          >
            {visibleProducts.map((product) => (
              <Card
                key={product.id}
                sx={{
                  flex: "0 0 calc(25% - 16px)", // 4 cards per row
                  maxWidth: "300px",
                  boxShadow: 3,
                  "&:hover": { boxShadow: 6 },
                  transition: "box-shadow 0.3s",
                  marginTop: "10px",
                  borderRadius: "12px",
                }}
              >
                <CardMedia
                  component="img"
                  height="70%"
                  image={product.image}
                  alt={product.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Navigation Buttons */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transform: "translateY(-50%)",
              px: 2,
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

          {/* Pagination Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <Box
                key={index}
                onClick={() => handleDotClick(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor:
                    currentIndex === index ? "black" : "lightgray",
                  mx: 1,
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductSlideshow;
