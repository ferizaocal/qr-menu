import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading(props) {
  return props.loading == true ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    props.children
  );
}
