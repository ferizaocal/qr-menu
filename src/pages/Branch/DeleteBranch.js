import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

export default function DeleteBranch({ open, handleClickClose, handleDelete }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          {"Silmek İstediğinize Emin Misiniz?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClickClose}>Vazgeç</Button>
          <Button
            onClick={() => {
              handleDelete();
              handleClickClose();
            }}
            autoFocus
          >
            Tamam
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
