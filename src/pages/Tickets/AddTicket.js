import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import TextInput from "../../components/TextInput";
import { useTranslation } from "react-i18next";

export default function AddTicket({ open, handleClickClose, saveTicket }) {
  const [ticketValue, setTicketValue] = React.useState("");
  const [ticketName, setTicketName] = React.useState("");
  const { t } = useTranslation();
  const handleAdd = () => {
    if (ticketValue && ticketName) {
      saveTicket(ticketValue, ticketName);
      handleClickClose();
    }
  };
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
          {t("addNewTicketButton")}
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
              handleChange={(e) => setTicketValue(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextInput
              id="outlined-basic"
              label={t("ticketName")}
              variant="outlined"
              fullWidth
              handleChange={(e) => setTicketName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>{t("cancel")}</Button>
          <Button onClick={handleAdd} autoFocus>
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
