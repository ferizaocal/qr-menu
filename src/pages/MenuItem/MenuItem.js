import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { pages } from "../App";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import Loading from "../../components/Loading";

export default function MenuItem({ setPage, selectedCategory }) {
  const [loading, setLoading] = useState(true);
  const [editOpenDialog, setEditOpenDialog] = useState(false);
  const [deleteOpenDialog, setDeleteOpenDialog] = useState(false);
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleOpenEditDialog = () => {
    setEditOpenDialog(true);
  };

  const handleCloseEditDialog = () => {
    setEditOpenDialog(false);
  };
  const handleOpenDeleteDialog = () => {
    setDeleteOpenDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteOpenDialog(false);
  };
  const handleOpenAddDialog = () => {
    setAddOpenDialog(true);
  };

  const handleCloseAddDialog = () => {
    setAddOpenDialog(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    fetch(`/wp-json/v1/getItemsByCategoryId/${selectedCategory.id}`)
      .then((res) => res.json())
      .then((res) => {
        setItems(res.items);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveMenuItem = async (
    itemName,
    itemImage,
    itemTicket,
    itemPrice,
    itemExplanation
  ) => {
    const formData = new FormData();
    formData.append("categoryId", selectedCategory.id);
    formData.append("itemImage", itemImage);
    formData.append("itemName", itemName);
    formData.append("itemExplanation", itemExplanation);
    formData.append("itemPrice", itemPrice);
    formData.append("itemTicket", JSON.stringify(itemTicket));

    fetch("/wp-json/v1/saveMenuItem", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          handleCloseAddDialog();
        }
      })
      .finally(() => {
        loadData();
      });
  };
  const editMenuItem = async (
    itemImage,
    itemName,
    itemExplanation,
    itemPrice,
    itemTicket
  ) => {
    const editedMenuItem = items[selectedIndex];
    const ItemId = editedMenuItem.id;
    const formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("itemTicket", JSON.stringify(itemTicket));
    formData.append("itemExplanation", itemExplanation);
    formData.append("itemPrice", itemPrice);

    if (itemImage) {
      formData.append("itemImage", itemImage);
    }
    formData.append("id", ItemId);

    fetch(`/wp-json/v1/updateMenuItem`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          handleCloseEditDialog();
        }
      })
      .finally(() => {
        loadData();
      });
  };

  const deleteMenuItem = async () => {
    let findItem = items[selectedIndex];

    let data = {
      id: findItem.id,
    };
    fetch(`/wp-json/v1/deleteMenuItem`, {
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

  return (
    <Loading loading={loading}>
      <Box component="div" sx={{ width: 600 }}>
        {items.length === 0 ? (
          <Box
            textAlign={"center"}
            alignItems="center"
            justifyContent="center"
            display="flex"
            marginTop="1px"
          >
            <Typography>
              Mevcut öge bulunmamaktadır. Lütfen öge ekleyiniz.
            </Typography>
          </Box>
        ) : (
          items.map((item, index) => {
            return (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  maxWidth: 600,
                  padding: 1,
                  background: "white",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  sx={{ fontSize: "inherit", color: "grey" }}
                  gutterBottom
                >
                  [{selectedCategory.CategoryName}]
                </Typography>

                <Box display="flex" alignItems="center" marginLeft="9px">
                  <Box flexGrow={1}>
                    <Typography sx={{ marginTop: "11px" }}>Öge Adı:</Typography>
                    <Typography variant="h6">{item.ItemName}</Typography>
                    <Typography sx={{ marginTop: "11px" }}>
                      Öge Açıklaması:
                    </Typography>
                    <Typography variant="h6">{item.ItemExplanation}</Typography>
                  </Box>

                  <Box>
                    {item?.ItemImage?.includes?.("uploads") && (
                      <CardMedia
                        sx={{ height: 180, width: 180, borderRadius: 200 }}
                        component="img"
                        src={item.ItemImage}
                        alt={item.ItemName}
                      />
                    )}
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <CardActions>
                    <IconButton
                      color="primmary"
                      onClick={() => {
                        setSelectedIndex(index);
                        handleOpenEditDialog();
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setSelectedIndex(index);
                        handleOpenDeleteDialog();
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <Typography>
                      Öge Etiketi:{" "}
                      {item?.tickets
                        ?.map?.((value) => value?.TicketName)
                        .join(",")}
                    </Typography>
                  </CardActions>

                  <CardActions>
                    <Typography variant="subtitle1">
                      Öge Fiyatı: {item.ItemPrice}
                    </Typography>
                  </CardActions>
                </Box>
              </Card>
            );
          })
        )}

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            onClick={() => {
              setPage(pages.Category);
            }}
          >
            <ArrowBackIosNewIcon />
          </Button>
          <Button variant="contained" onClick={handleOpenAddDialog}>
            Yeni Öge Ekle
          </Button>
        </Box>
        {editOpenDialog && (
          <EditItem
            selectedItem={items[selectedIndex]}
            editMenuItem={editMenuItem}
            open={editOpenDialog}
            handleClickClose={handleCloseEditDialog}
          />
        )}
        {deleteOpenDialog && (
          <DeleteItem
            deleteMenuItem={deleteMenuItem}
            open={deleteOpenDialog}
            handleClickClose={handleCloseDeleteDialog}
          />
        )}
        {addOpenDialog && (
          <AddItem
            open={addOpenDialog}
            saveMenuItem={saveMenuItem}
            handleClickClose={handleCloseAddDialog}
          />
        )}
      </Box>
    </Loading>
  );
}
