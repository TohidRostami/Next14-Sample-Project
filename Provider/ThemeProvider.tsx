"use client";
import React from "react";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

import i18n from "@/Translation/i18next";
import SideBar from "@/components/SideBar";

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
      <SideBar
        mode={mode}
        setMode={setMode}
        handleLanguageChange={handleLanguageChange}
      />
      {children}
    </ThemeProvider>
  );
}
