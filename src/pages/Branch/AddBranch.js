import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AddBranch({ open, handleClickClose, saveBranch }) {
  const [branchName, setBranchName] = React.useState("");
  const [currencyUnit, setCurrencyUnit] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const { t } = useTranslation();

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const handleChangeCurencyUnit = (event) => {
    setCurrencyUnit(event.target.value);
  };
  const handleAdd = () => {
    if (branchName && currencyUnit && language) {
      saveBranch(branchName, currencyUnit, language);
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
          {t("addNewBranchButton")}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            <TextField
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              id="outlined-basic"
              label={t("branchName")}
              variant="outlined"
              fullWidth
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Para Birimi</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currencyUnit}
              label={t("currencyUnit")}
              onChange={handleChangeCurencyUnit}
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value={"Lira"}>Lira</MenuItem>
              <MenuItem value={"Dolar"}>Dolar</MenuItem>
              <MenuItem value={"Euro"}>Euro</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Ana Dil</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label={t("language")}
              onChange={handleChangeLanguage}
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value={"Türkçe"}>Türkçe</MenuItem>
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Deutsch"}>Deutsch</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>İptal</Button>
          <Button onClick={handleAdd} autoFocus>
            {t("save")}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
