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

export default function AddTicket({ open, handleClickClose, saveTicket }) {
  const [ticketValue, setTicketValue] = React.useState("");
  const [ticketName, setTicketName] = React.useState("");
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
          {"Yeni Etiket Ekle"}
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
              label="Etiket Değeri"
              variant="outlined"
              fullWidth
              handleChange={(e) => setTicketValue(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextInput
              id="outlined-basic"
              label="Etiket Adı "
              variant="outlined"
              fullWidth
              handleChange={(e) => setTicketName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>İptal</Button>
          <Button onClick={handleAdd} autoFocus>
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
