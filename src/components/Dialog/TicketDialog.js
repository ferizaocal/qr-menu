import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

export default function TicketDialog({ open, handleClickClose, tickets }) {
  return (
    <Dialog
      open={open}
      onClose={handleClickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2>İçindekiler</h2>
            {tickets?.map((ticket, index) => (
              <Typography key={index}>
                {ticket.TicketValue}: {ticket.TicketName}
              </Typography>
            ))}
          </div>
        </DialogTitle>
        <Button
          onClick={handleClickClose}
          autoFocus
          sx={{
            height: "35px !important",
            border: "1px solid !important",
            borderRadius: "5px !important",
            backgroundColor: "red !important",
            margin: "45 10px 10px 0 !important",
            marginLeft: "auto",
            transition: "background-color 0.3s !important",
            ":hover": {
              backgroundColor: "lightcoral !important",
            },
          }}
        >
          Tamam
        </Button>
      </DialogContent>
    </Dialog>
  );
}
