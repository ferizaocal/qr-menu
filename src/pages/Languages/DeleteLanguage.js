import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DeleteLanguage({
  open,
  handleClickClose,
  deleteLanguage,
}) {
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
          <Button onClick={handleClickClose}>{t("givUp")}</Button>
          <Button
            onClick={() => {
              deleteLanguage();
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
