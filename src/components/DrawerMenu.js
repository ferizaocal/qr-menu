import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useState } from "react";
import { pages } from "../pages/App";
import { useTranslation } from "react-i18next";

export default function DrawerMenu({ setPage, isMobileDevice }) {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(null);

  const menus = [
    {
      id: 1,
      name: t("categories"),
      page: pages.Category,
    },
    {
      id: 2,
      name: t("restaurantInfos"),
      page: pages.RestaurantInformation,
    },
    {
      id: 3,
      name: t("tickets"),
      page: pages.Tickets,
    },
    {
      id: 4,
      name: t("languages"),
      page: pages.Languages,
    },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        darker: blue[900],
      },
    },
  });

  const handleListItemClick = (index, page) => {
    setSelectedIndex(index);
    if (page != null) {
      setPage(page);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <List
        sx={{
          background: "white",
          width: isMobileDevice ? "100%" : "260px",
          borderRadius: "4px",
        }}
      >
        {menus.map((text, index) => (
          <ListItem key={text.id} disablePadding>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, text.page)}
              sx={{
                ":hover": {
                  backgroundColor: theme.palette.primary.light,
                  color: "#fff",
                },
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "#fff",
                  },
                },
              }}
            >
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </ThemeProvider>
  );
}
