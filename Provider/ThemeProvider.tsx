"use client";
import React from "react";
import { useState } from "react";
import {
  Box,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";

import i18n from "@/Translation/i18next";

export default function useCustomTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleLanguageChange = (language: string | unknown) => {
    i18n.changeLanguage(language as string);
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid lightgrey",
          padding: "10px 10px",
        }}
      >
        <Select
          value={mode}
          onChange={(event) => setMode(event.target.value as "light" | "dark")}
          sx={{ fontSize: "0.8rem" }}
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>
        <Select
          defaultValue={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value as "en" | "de")}
          sx={{ fontSize: "0.8rem", marginLeft: "10px" }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="de">German</MenuItem>
        </Select>
      </Box>
      {children}
    </ThemeProvider>
  );
}
