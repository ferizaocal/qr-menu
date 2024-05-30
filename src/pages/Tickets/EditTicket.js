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

export default function EditTicket({ open, handleClickClose, updateTicket }) {
  const [ticketValue, setTicketValue] = React.useState("");
  const [ticketName, setTicketName] = React.useState("");
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
          {"Etiketi Düzenle"}
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
              value={ticketValue}
              handleChange={(e) => setTicketValue(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextInput
              id="outlined-basic"
              label="Etiket Adı "
              variant="outlined"
              fullWidth
              value={ticketName}
              handleChange={(e) => setTicketName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>İptal</Button>
          <Button
            onClick={() => {
              updateTicket(ticketValue, ticketName);
              handleClickClose();
            }}
            autoFocus
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
