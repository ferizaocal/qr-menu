import { TextField } from "@mui/material";
import React from "react";

export default function TextInput({
  value,
  sx,
  handleChange,
  id,
  label,
  variant,
  fullWidth,
  size,
}) {
  return (
    <TextField
      sx={sx}
      value={value}
      onChange={handleChange}
      id={id}
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
    />
  );
}
