import React, { useState } from "react";
import Category from "./Category/Category";
import Branch from "./Branch/Branch";
import { Box, Card, Grid, useMediaQuery } from "@mui/material";
import DrawerMenu from "../components/DrawerMenu";
import Header from "../components/Header";
import MenuItem from "./MenuItem/MenuItem";
import RestaurantInformation from "./RestaurantInformation/RestaurantInformation";
import Tickets from "./Tickets/Tickets";
import Languages from "./Languages/Languages";
import Home from "./Home/Home";

export const pages = {
  Branch: "Branch",
  Category: "Category",
  MenuItem: "MenuItem",
  RestaurantInformation: "RestaurantInformation",
  Tickets: "Tickets",
  Languages: "Languages",
  DrawerMenu: "DrawerMenu",
};
export default function App({ user }) {
  const isMobileDevice = useMediaQuery("(max-width:600px)");
  const [drawerMenuOpen, setDrawerMenuOpen] = React.useState(
    isMobileDevice ? false : true
  );
  const [page, setPage] = React.useState(pages.Branch);
  const [selectedCategory, setSelectedCategory] = React.useState({});
  const [selectedBranch, setSelectedBranch] = React.useState({});
  const [selectedItem, setSelectedItem] = React.useState({});
  const [selectedLanguage, setSelectedLanguage] = React.useState({});
  const [selectedTicket, setSelectedTicket] = React.useState({});
  if (user === "admin") {
    return (
      <Box sx={{ width: "100%" }}>
        <Header
          setPage={setPage}
          page={page}
          menuOpen={() => {
            setDrawerMenuOpen(!drawerMenuOpen);
          }}
        />
        <Box
          sx={[
            { width: "100%" },
            page === pages.Branch || page === pages.Profile
              ? {
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  height: "100vh",
                }
              : {},
          ]}
        >
          {page == pages.Branch && (
            <Branch
              setSelectedLanguage={setSelectedLanguage}
              setSelectedBranch={setSelectedBranch}
              setPage={setPage}
            />
          )}
          {page == pages.Profile && <Profile setPage={setPage} />}
          {page != pages.Branch && page != pages.Profile && (
            <>
              <Grid container>
                <Grid item md={4} lg={4} xs={12} paddingTop={2}>
                  {drawerMenuOpen && (
                    <DrawerMenu
                      setPage={setPage}
                      isMobileDevice={isMobileDevice}
                    />
                  )}
                </Grid>
                <Grid
                  item
                  md={8}
                  lg={8}
                  xs={12}
                  paddingTop={2}
                  paddingRight={2}
                  paddingLeft={2}
                >
                  {page == pages.Category && (
                    <Category
                      selectedBranch={selectedBranch}
                      selectedLanguage={selectedLanguage}
                      setSelectedCategory={setSelectedCategory}
                      setPage={setPage}
                    />
                  )}
                  {page == pages.MenuItem && (
                    <MenuItem
                      selectedCategory={selectedCategory}
                      setSelectedItem={setSelectedItem}
                      setPage={setPage}
                    />
                  )}
                  {page == pages.RestaurantInformation && (
                    <RestaurantInformation
                      setPage={setPage}
                      selectedBranch={selectedBranch}
                    />
                  )}
                  {page == pages.Tickets && (
                    <Tickets
                      selectedTicket={selectedTicket}
                      setPage={setPage}
                    />
                  )}
                  {page == pages.Languages && <Languages setPage={setPage} />}
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Box>
    );
  } else {
    return (
      <>
        <Home />
      </>
    );
  }
}
