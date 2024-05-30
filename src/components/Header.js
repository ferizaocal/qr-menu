import { AccountCircle, ArrowLeft, ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { pages } from "../pages/App";

export default function Header({ setPage, page, menuOpen }) {
  const isMobileDevice = useMediaQuery("(max-width:600px)");

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {page !== pages.Branch &&
              page !== pages.Profile &&
              isMobileDevice && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    menuOpen();
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}

            <Box
              sx={{
                flexGrow: 1,
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                gap: 2,
              }}
            >
              {page !== pages.Branch && (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  sx={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    setPage(pages.Branch);
                  }}
                >
                  <ChevronLeft />
                  Şubelerim
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
