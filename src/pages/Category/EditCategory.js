import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

export default function EditCategory({
  open,
  handleClickClose,
  editCategory,
  selectedCategory,
}) {
  const [name, setName] = React.useState(selectedCategory.CategoryName || "");
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(
    selectedCategory.CategoryImage || ""
  );

  const handleChangeImage = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    let url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
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
          {"Kategori Düzenle"}
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
            {imageUrl && (
              <div>
                <img
                  style={{ width: "100px", height: "100px" }}
                  component="img"
                  src={imageUrl}
                  alt={name}
                />
              </div>
            )}

            <TextField
              sx={{ marginTop: 2 }}
              id="outlined-basic"
              label="Kategori Adı"
              variant="outlined"
              fullWidth
              onChange={handleChangeName}
              value={name}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>İptal</Button>
          <Button
            onClick={() => {
              editCategory(name, image);
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
