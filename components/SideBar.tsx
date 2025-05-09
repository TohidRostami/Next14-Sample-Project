import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  Select,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/system";
import Link from "next/link";
import i18n from "@/Translation/i18next";

const selectStyle = {
  height: "45px",
  width: "150px",
  fontSize: "1rem",
  color: "black",
  backgroundColor: "white",
  borderRadius: 2,
  borderBottom: "1px solid white",
  margin: "20px 20px",
};

const pages = ["Profile", "Account", "Dashboard", "Logout", "Create Post","Products"];
const logoText = "Sample Online Shop";

const SideBar = ({
  mode,
  setMode,
  handleLanguageChange,
}: {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  handleLanguageChange: (language: string | unknown) => void;
}) => {
  const [open, setOpen] = useState(false); // State to control sidebar

  // Toggle sidebar
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box>
      {/* AppBar */}
      <AppBar
        position="sticky"
        className="bg-black"
        sx={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className="flex-grow"
            sx={{
              margin: 1,
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {logoText}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        className="z-50"
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "black",
            color: "white",
            width: 250,
          },
        }}
      >
        {/* List of menu items */}
        <List>
          {pages.map((page) => (
            <ListItemButton key={page} style={{ margin: "10px" }} onClick={toggleSidebar}>
              <Link
                href={`${page.trim().toLowerCase().replace(" ", "")}`}
                style={{ textDecoration: "none", color: "white"}}
              >
                <Typography style={{ fontSize:"1.3rem" }} >{page}</Typography>
              </Link>
            </ListItemButton>
          ))}
          <Select
            value={mode}
            onChange={(event) =>
              setMode(event.target.value as "light" | "dark")
            }
            sx={selectStyle}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>

          <Select
            defaultValue={i18n.language}
            onChange={(e) =>
              handleLanguageChange(e.target.value as "en" | "de")
            }
            sx={selectStyle}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
