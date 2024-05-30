import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { ListItemDecorator, List, ListItem } from "@mui/joy";

export default function TabMenu({ selectedMenu, setSelectedMenu, setOpen }) {
  const [menuList, setMenuList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const getLanguage = localStorage.getItem("selectedLanguage");
  const [selectedLanguage, setSelectedLanguage] = useState(
    JSON.parse(getLanguage)?.id
  );

  const getBranch = localStorage.getItem("selectedBranch");
  useEffect(() => {
    getLoadMenu();
    getLoadLanguages();
  }, []);

  const getLoadMenu = () => {
    if (getBranch) {
      fetch(
        `/wp-json/v1/getCategoriesByBranchIDAndLanguageID/${
          JSON.parse(getBranch)?.id
        }/${JSON.parse(getLanguage)?.id}`
      )
        .then((res) => res.json())
        .then((res) => {
          setMenuList(res.categories);
          setSelectedMenu(res.categories[0]);
        });
    }
  };
  const getLoadLanguages = () => {
    if (getBranch) {
      fetch(`/wp-json/v1/getLanguages`)
        .then((res) => res.json())
        .then((res) => {
          setLanguages(res.languages);
        });
    }
  };
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Box padding="15px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="#ffff"
        paddingTop={"10px"}
        paddingBottom={"10px"}
        color="#fff"
      >
        <Button
          variant="h4"
          sx={{
            border: "1px solid !important",
            borderRadius: "5px !important",
            backgroundColor: "red !important",
            margin: "45 10px 10px 0 !important",
            color: "white",
            transition: "background-color 0.3s !important",
            ":hover": {
              backgroundColor: "lightcoral !important",
            },
          }}
        >
          {getBranch && JSON.parse(getBranch).BranchName ? (
            <Typography
              onClick={() => {
                setOpen(true);
              }}
              variant="h4"
            >
              {JSON.parse(getBranch).BranchName} Menüsü
            </Typography>
          ) : (
            <Typography variant="h4">Menü</Typography>
          )}
        </Button>
        {languages?.length > 0 && (
          <Box>
            <Select
              id="language-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map((language) => (
                <MenuItem key={language.id} value={language.id}>
                  {language.LanguageName}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )}
      </Box>
      <List
        orientation="horizontal"
        variant="outlined"
        sx={{
          overflowX: "auto",
          marginBottom: "10px",
          "--ListItemDecorator-size": "48px",
          "--ListItem-paddingY": "1rem",
          borderWidth: 0,
          paddingLeft: "0px !important",
          paddingRight: "0px !important",
        }}
      >
        {menuList.map((menu, index) => (
          <ListItem
            key={index}
            onClick={() => setSelectedMenu(menu)}
            sx={{
              marginRight: "5px",
              height: "50px",
              color: "black",
              borderRadius: "5px",
              border: "1px solid red !important",
              ":hover": {
                cursor: "pointer",
                color: "#fff",
                backgroundColor: "red",
              },
            }}
          >
            {menu.CategoryName}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
