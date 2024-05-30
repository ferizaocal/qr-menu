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

export default function AddCategory({ open, handleClickClose, saveCategory }) {
  const [name, setName] = React.useState("");

  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const handleChangeImage = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    let url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
  };

  const handleAdd = () => {
    if (name) {
      saveCategory(name, image);
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
          {"Yeni Kategori Ekle"}
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
              Fotoğraf Seç
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
              sx={{ marginTop: 2 }}
              value={name}
              id="outlined-basic"
              label="Kategori Adı"
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
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
