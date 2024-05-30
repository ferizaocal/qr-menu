import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

export default function DeleteLanguage({
  open,
  handleClickClose,
  deleteLanguage,
}) {
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
              deleteLanguage();
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
