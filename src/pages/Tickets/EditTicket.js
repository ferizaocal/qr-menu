import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import TextInput from "../../components/TextInput";
import { useTranslation } from "react-i18next";

export default function EditTicket({ open, handleClickClose, updateTicket }) {
  const [ticketValue, setTicketValue] = React.useState("");
  const [ticketName, setTicketName] = React.useState("");
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
          {t("editTicket")}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              marginTop: 2,
              textAlign: "center",
            }}
          >
            <TextInput
              id="outlined-basic"
              label={t("ticketValue")}
              variant="outlined"
              fullWidth
              value={ticketValue}
              handleChange={(e) => setTicketValue(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextInput
              id="outlined-basic"
              label={t("ticketName")}
              variant="outlined"
              fullWidth
              value={ticketName}
              handleChange={(e) => setTicketName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>{t("cancel")}</Button>
          <Button
            onClick={() => {
              updateTicket(ticketValue, ticketName);
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
