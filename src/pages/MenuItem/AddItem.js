import { TireRepair } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AddItem({ open, handleClickClose, saveMenuItem }) {
  const [name, setName] = React.useState("");
  const [explanation, setExplanation] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const { t } = useTranslation();
  const [selectedTickets, setSelectedTickets] = React.useState([]);
  console.log(selectedTickets, "selectedtickets");
  const [tickets, setTickets] = React.useState();
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeExplanation = (event) => {
    setExplanation(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleAdd = () => {
    if (name && explanation && price && selectedTickets) {
      saveMenuItem(name, image, selectedTickets, price, explanation);
    }
  };
  const handleChangeImage = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    let url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
  };
  useEffect(() => {
    loadTicketsByBranchID();
  }, []);

  const getBranch = localStorage.getItem("adminSelectedBranch");
  const loadTicketsByBranchID = () => {
    let branchId = JSON.parse(getBranch)?.id;
    fetch(`/wp-json/v1/getTicketsByBranchID/${branchId}`)
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.tickets);
      })
      .catch((er) => {
        console.log(er);
      });
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
          {t("addNewMenuItemButton")}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              marginTop: 2,
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: 2 }}
              onChange={handleChangeImage}
            >
              {t("choosePhoto")}
              <input type="file" hidden />
            </Button>
            {imageUrl != null && (
              <div>
                <img
                  src={imageUrl}
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            )}
            <TextField
              value={name}
              onChange={handleChangeName}
              id="outlined-basic"
              label={t("menuItemName")}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <TextField
              value={explanation}
              onChange={handleChangeExplanation}
              id="outlined-basic"
              label={t("explanation")}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              value={price}
              onChange={handleChangePrice}
              id="outlined-basic"
              label={t("price")}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            <Autocomplete
              multiple
              id="tags-standard"
              options={tickets || []}
              onChange={(event, value) => {
                setSelectedTickets(value);
              }}
              fullWidth
              sx={{ marginBottom: 2 }}
              getOptionLabel={(option) => option.TicketName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("ticket")}
                  placeholder="Etiket"
                  variant="outlined"
                />
              )}
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
