import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import TabMenu from "../../components/TabMenu/TabMenu";
import Foods from "../../components/Food/Foods";
import BranchDialog from "../../components/Dialog/BranchDialog";

export default function Home({}) {
  const [selectedMenu, setSelectedMenu] = useState({});
  const getLanguage = localStorage.getItem("selectedLanguage");
  const [open, setOpen] = useState(
    getLanguage === null ||
      Object.keys(JSON.parse(getLanguage || {}))?.length === 0
      ? true
      : false
  );
  return (
    <Box
      style={{
        width: "70%",
        height: "100vh",

        alignItems: "stretch",
      }}
    >
      <Card variant="outlined" sx={{ flexGrow: 1, height: "100%" }}>
        <TabMenu
          setOpen={setOpen}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        {selectedMenu != undefined && Object.keys(selectedMenu).length === 0 ? (
          <Typography variant="body1">Menü Bulunamadı</Typography>
        ) : (
          <Foods selectedMenu={selectedMenu} />
        )}
      </Card>
      {open && <BranchDialog open={open} setOpen={setOpen} />}
    </Box>
  );
}
