import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function AddLanguage({
  open,
  handleClickClose,
  saveLanguage,
  existingLanguages,
}) {
  const [language, setLanguage] = React.useState("");
  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleAdd = () => {
    if (language) {
      saveLanguage(language);
      handleClickClose();
    }
  };
  const { t } = useTranslation();
  const languages = ["Türkçe", "English", "Deutsch", "Español", "Français"];

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t("choose")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label={t("language")}
              onChange={handleChangeLanguage}
              sx={{ marginBottom: 2 }}
            >
              {languages
                .filter((value, index) => {
                  let findLang = existingLanguages.find(
                    (c) => c.lang === value
                  );
                  if (findLang) {
                    return false;
                  }
                  return value;
                })
                .map((lang, index) => (
                  <MenuItem key={index} value={lang}>
                    {lang}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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
