import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Box, Button, Grid, Typography } from "@mui/material";
import AddBranch from "./AddBranch";
import { pages } from "../App";
import Loading from "../../components/Loading";
import DeleteBranch from "./DeleteBranch";

export default function Branch({
  setPage,
  setSelectedBranch,
  setSelectedLanguage,
}) {
  const [open, setOpen] = React.useState(false);
  const [deleteOpenDialog, setDeleteOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handleOpenAddDialog = () => {
    setOpen(true);
  };

  const handleCloseAddDialog = () => {
    setOpen(false);
  };
  const handleOpenDeleteDialog = () => {
    setDeleteOpenDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpenDialog(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    fetch(`/wp-json/v1/getBranches`)
      .then((res) => res.json())
      .then((res) => {
        setBranches(res.branches);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveBranch = async (branchName, currencyUnit, language) => {
    const data = {
      branchName: branchName,
      currencyUnit: currencyUnit,
      language: language,
    };

    fetch("/wp-json/v1/saveBranches", {
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
  const handleDelete = async (id) => {
    let findBranch = branches[selectedIndex];
    let data = {
      id: findBranch.id,
    };
    fetch(`/wp-json/v1/deleteBranch`, {
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
              {item.BranchName?.[0]?.toString()}
            </Avatar>
          }
          action={
            <Grid mt={"10px"}>
              <Button
                aria-label="edit"
                variant="outlined"
                size="small"
                onClick={() => {
                  fetch(`/wp-json/v1/getLanguages`)
                    .then((res) => res.json())
                    .then((res) => {
                      if (res?.languages?.length > 0) {
                        localStorage.setItem(
                          "adminSelectedLanguage",
                          JSON.stringify(res.languages[0])
                        );
                        setSelectedLanguage(res.languages[0]);
                        localStorage.setItem(
                          "adminSelectedBranch",
                          JSON.stringify(item)
                        );
                        setSelectedBranch(item);
                        setPage(pages.Category);
                      }
                    });
                }}
              >
                Düzenle
              </Button>
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
          title={item.BranchName}
        />
      </Card>
    );
  };

  return (
    <Loading loading={loading}>
      <Box component="div" sx={{ width: 400 }}>
        {branches.length === 0 ? (
          <Box
            textAlign={"center"}
            alignItems="center"
            justifyContent="center"
            display="flex"
            marginTop="1px"
          >
            <Typography>
              Mevcut şube bulunmamaktadır.Lütfen şube ekleyiniz.
            </Typography>
          </Box>
        ) : (
          branches.map((value, index) => (
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
            Yeni Şube Ekle
          </Button>
        </Box>
        <AddBranch
          open={open}
          saveBranch={saveBranch}
          handleClickClose={handleCloseAddDialog}
        />
        <DeleteBranch
          handleDelete={handleDelete}
          open={deleteOpenDialog}
          handleClickClose={handleCloseDeleteDialog}
        />
      </Box>
    </Loading>
  );
}
