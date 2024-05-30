import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { pages } from "../pages/App";

export default function DrawerMenu({ setPage, isMobileDevice }) {
  const menus = [
    {
      id: 1,
      name: "Kategoriler",
      page: pages.Category,
    },
    {
      id: 2,
      name: "Restoran Bilgileri",
      page: pages.RestaurantInformation,
    },
    {
      id: 3,
      name: "Etiketler",
      page: pages.Tickets,
    },
    {
      id: 4,
      name: "Diller",
      page: pages.Languages,
    },
  ];
  return (
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
            onClick={() => {
              if (text.page != null) {
                setPage(text.page);
              }
            }}
          >
            <ListItemText primary={text.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
