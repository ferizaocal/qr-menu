import { AccountCircle, ArrowLeft, ChevronLeft } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { pages } from "../pages/App";
import {
  getLanguagePreference,
  saveLanguagePreference,
} from "../utils/language";
import { useTranslation } from "react-i18next";
export default function Header({ setPage, page, menuOpen }) {
  const isMobileDevice = useMediaQuery("(max-width:600px)");
  const { t } = useTranslation();
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
                    localStorage.removeItem("adminSelectedBranch");
                  }}
                >
                  <ChevronLeft />
                  {t("branches")}
                </Button>
              )}
            </Box>
            <LanguageMenu />
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

const LanguageMenu = () => {
  const [language, setLanguage] = React.useState(
    getLanguagePreference() || "tr"
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    saveLanguagePreference(language);
  }, [language]);
  const handleChangeLang = (lang) => {
    saveLanguagePreference(lang);
    window.location.reload();
  };
  return (
    <>
      <Tooltip title="Language settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <LanguageIcon style={{ color: "#fff" }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleChangeLang("tr");
          }}
        >
          Türkçe
        </MenuItem>
        <MenuItem onClick={() => handleChangeLang("en")}>English</MenuItem>
      </Menu>
    </>
  );
};
