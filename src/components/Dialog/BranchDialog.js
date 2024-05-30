import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function BranchDialog({ open, setOpen }) {
  const [branches, setBranches] = useState([]);
  const getBranch = localStorage.getItem("selectedBranch");
  const [selectedBranch, setSelectedBranch] = useState(getBranch || {});

  useEffect(() => {
    setSelectedBranch(getBranch || {});
    getLoadBranches();
    getLanguages();
  }, []);
  const getLanguages = () => {
    fetch(`/wp-json/v1/getLanguages`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.languages?.length > 0) {
          localStorage.setItem(
            "selectedLanguage",
            JSON.stringify(res.languages[0])
          );
        }
      });
  };
  const getLoadBranches = () => {
    fetch(`/wp-json/v1/getBranches`)
      .then((res) => res.json())
      .then((res) => {
        setBranches(res.branches);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handleBranchChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedBranch(selectedValue);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => {
          if (Object.keys(selectedBranch).length !== 0) {
            setOpen(false);
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <DialogContent sx={{ width: 500, height: 80 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Şube Seçiniz</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedBranch}
              onChange={handleBranchChange}
              label="Şube Seçiniz"
              sx={{ marginBottom: 2 }}
            >
              {branches.map((branch, index) => (
                <MenuItem key={index} value={branch}>
                  {branch.BranchName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ marginRight: "16px", marginBottom: "8px" }}>
          <Button
            disabled={Object.keys(selectedBranch).length === 0}
            sx={{
              height: "35px !important",
              border: "1px solid !important",
              borderRadius: "5px !important",
              marginLeft: "auto",
              transition: "background-color 0.3s !important",
              color: "#fff !important",
              ":hover": {
                backgroundColor: "lightcoral !important",
              },
            }}
            onClick={() => {
              getLanguages();
              setOpen(false);
              localStorage.setItem(
                "selectedBranch",
                JSON.stringify(selectedBranch)
              );

              location.reload();
            }}
          >
            Tamam
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
