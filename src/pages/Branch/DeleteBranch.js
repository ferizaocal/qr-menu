import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DeleteBranch({ open, handleClickClose, handleDelete }) {
  const { t } = useTranslation();
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
          {t("deleteMessage")}
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
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
