import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SelectLanguage({
  setSelectedLanguage,
  selectLanguage,
}) {
  const [languages, setLanguages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [language, setLanguage] = React.useState({});
  const { t } = useTranslation();
  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    fetch(`/wp-json/v1/getLanguages`)
      .then((res) => res.json())
      .then((res) => {
        setLanguages(res.languages);
        let getAdminSelectedLanguage = localStorage.getItem(
          "adminSelectedLanguage"
        );
        setSelectedLanguage(JSON.parse(getAdminSelectedLanguage));
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log("languages", language);
  if (languages.length > 1 && !loading) {
    return (
      <Box
        sx={{
          background: "white",
          padding: "5px",
          marginBottom: "10px",
          borderRadius: "4px",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            {t("chooseLanguage")}
          </InputLabel>
          <Select
            value={selectLanguage?.id}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={t("chooseLanguage")}
          >
            {languages.map((lang, index) => {
              return (
                <MenuItem
                  onClick={() => setSelectedLanguage(lang)}
                  key={index}
                  value={lang.id}
                >
                  {lang.LanguageName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
  return null;
}
