import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddLanguage from "./AddLanguage";
import DeleteLanguage from "./DeleteLanguage";
import Loading from "../../components/Loading";

export default function Languages({ setPage, setSelectedLanguage }) {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [languages, setLanguages] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const handleOpenAddDialog = () => {
    setOpen(true);
  };

  const handleCloseAddDialog = () => {
    setOpen(false);
  };
  const handleOpenDeleteDialog = () => {
    setDeleteOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpen(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    fetch(`/wp-json/v1/getLanguages`)
      .then((res) => res.json())
      .then((res) => {
        setLanguages(res.languages);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveLanguage = async (languageName) => {
    const data = {
      languageName: languageName,
    };

    fetch("/wp-json/v1/saveLanguage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        loadData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const deleteLanguage = async (id) => {
    let findLanguage = languages[selectedIndex];
    let data = {
      id: findLanguage.id,
    };
    fetch(`/wp-json/v1/deleteLanguage`, {
      method: "DELETE",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        loadData();
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const CardItem = ({ item, index }) => {
    return (
      <Card sx={{ maxWidth: 400, padding: 1, marginBottom: 1 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="logo">
              {item.LanguageName.charAt(0)}
            </Avatar>
          }
          action={
            <Grid mt={"10px"}>
              <Button
                sx={{ marginLeft: "5px" }}
                aria-label="edit"
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedIndex(index);
                  handleOpenDeleteDialog();
                }}
              >
                Sil
              </Button>
            </Grid>
          }
          title={item.LanguageName}
        />
      </Card>
    );
  };

  return (
    <Loading loading={loading}>
      <Box component="div" sx={{ width: 400 }}>
        {languages.length === 0 ? (
          <Box
            textAlign={"center"}
            alignItems="center"
            justifyContent="center"
            display="flex"
            marginTop="1px"
          >
            <Typography>
              Mevcut dil bulunmamaktadır.Lütfen dil ekleyiniz.
            </Typography>
          </Box>
        ) : (
          languages.map((value, index) => (
            <CardItem index={index} item={value} key={index} />
          ))
        )}
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          marginTop="1px"
        >
          <Button
            variant="contained"
            sx={{ marginTop: 3 }}
            onClick={handleOpenAddDialog}
          >
            Yeni Dil Ekle
          </Button>
        </Box>
        {open && (
          <AddLanguage
            open={open}
            saveLanguage={saveLanguage}
            handleClickClose={handleCloseAddDialog}
            existingLanguages={languages}
          />
        )}
        <DeleteLanguage
          open={deleteOpen}
          deleteLanguage={deleteLanguage}
          handleClickClose={handleCloseDeleteDialog}
        />
      </Box>
    </Loading>
  );
}
