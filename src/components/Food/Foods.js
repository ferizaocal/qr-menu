import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import TicketDialog from "../Dialog/TicketDialog";
import { MockFoods } from "../../mock/data";
import Loading from "../Loading";

export default function Foods({ selectedMenu }) {
  const [search, setSearch] = useState("");
  const [foods, setFoods] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (selectedMenu) {
      getLoadMenuItem();
    }
  }, [selectedMenu]);

  const getLoadMenuItem = () => {
    setLoading(true);
    fetch(`/wp-json/v1/getItemsByCategoryId/${selectedMenu?.id}`)
      .then((res) => res.json())
      .then((res) => {
        setFoods(res.items);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpenDialog = (tickets) => {
    setDialogOpen(true);
    setSelectedTickets(tickets);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedTickets([]);
  };

  return (
    <Box padding="15px">
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          marginBottom: "20px",
        }}
      >
        <SearchIcon sx={{ marginLeft: "8px" }} />

        <InputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ürün Ara..."
          sx={{
            flex: 1,
            backgroundColor: "#fff !important",
          }}
        />
      </Paper>
      <Box
        sx={{
          maxHeight: "500px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          overflowY: "auto",
        }}
      >
        <Loading loading={loading}>
          {foods?.length > 0 ? (
            foods
              ?.filter?.((x) => {
                if (search === "") {
                  return x;
                } else if (
                  x.ItemName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return x;
                }
              })
              .map((food) => (
                <Box
                  className="food-item"
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    overflow: "hidden",
                    width: "100%",
                    transition: "transform 0.3s ease-in-out",
                    position: "relative",
                  }}
                >
                  {food?.ItemImage?.includes?.("uploads") && (
                    <img
                      src={food?.ItemImage}
                      style={{
                        width: 150,
                        height: 150,
                        border: "1px solid #ccc",
                        margin: "7px",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      flex: "1 1 auto",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography
                        sx={{
                          textAlign: "right",
                          paddingRight: "5px",
                          marginright: "20px",
                        }}
                      >
                        {new Intl.NumberFormat("tr-Tr", {
                          style: "currency",
                          currency: "TRY",
                        }).format(food.ItemPrice)}
                      </Typography>
                      <Typography sx={{ paddingLeft: "5px" }}>
                        {food?.ItemName}
                      </Typography>
                      <Typography sx={{ paddingLeft: "5px" }}>
                        {food?.ItemExplanation}
                      </Typography>
                    </div>

                    <div style={{ height: "35px !important" }}>
                      <Typography
                        key={food.id}
                        onClick={() => handleOpenDialog(food.tickets)}
                      >
                        <Button
                          sx={{
                            height: "10px",

                            border: "1px solid !important",
                            borderRadius: "5px !important",
                            backgroundColor: "red !important",
                            transition: "background-color 0.3s !important",
                            ":hover": {
                              backgroundColor: "lightcoral !important",
                            },
                          }}
                        >
                          {food?.tickets
                            ?.map?.((value) => value?.TicketValue)
                            .join(",")}
                        </Button>
                      </Typography>
                    </div>
                  </Box>
                </Box>
              ))
          ) : (
            <Typography
              variant="h4"
              sx={{ textAlign: "center", width: "100%" }}
            >
              Ürün Bulunamadı
            </Typography>
          )}
        </Loading>

        <TicketDialog
          open={dialogOpen}
          handleClickClose={handleCloseDialog}
          tickets={selectedTickets}
        />
      </Box>
    </Box>
  );
}
