import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddTicket from "./AddTicket";
import Loading from "../../components/Loading";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteTicket from "./DeleteTicket";
import EditTicket from "./EditTicket";
import { Delete, Edit } from "@mui/icons-material";

export default function Tickets({ setPage }) {
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [deleteOpenDialog, setDeleteOpenDialog] = React.useState(false);
  const [tickets, setTickets] = useState([]);
  const [editOpenDialog, setEditOpenDialog] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const getBranch = localStorage.getItem("adminSelectedBranch");

  const handleOpenAddTicketDialog = () => {
    setAddOpenDialog(true);
  };

  const handleCloseAddTicketDialog = () => {
    setAddOpenDialog(false);
  };
  const handleOpenDeleteTicketDialog = () => {
    setDeleteOpenDialog(true);
  };

  const handleCloseDeleteTicketDialog = () => {
    setDeleteOpenDialog(false);
  };
  const handleOpenEditTicketDialog = () => {
    setEditOpenDialog(true);
  };

  const handleCloseEditTicketDialog = () => {
    setEditOpenDialog(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    fetch(`/wp-json/v1/getTicketsByBranchID/${JSON.parse(getBranch)?.id}`)
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.tickets);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const saveTicket = async (ticketValue, ticketName) => {
    const data = {
      ticketValue: ticketValue,
      ticketName: ticketName,
      branchId: JSON.parse(getBranch)?.id,
    };

    fetch("/wp-json/v1/saveTicket", {
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
  const updateTicket = async (ticketValue, ticketName) => {
    const editedTicket = tickets[selectedIndex];
    const ticketId = editedTicket.id;

    const data = {
      ticketValue: ticketValue,
      ticketName: ticketName,
      branchId: JSON.parse(getBranch)?.id,
      id: parseInt(ticketId),
    };
    fetch("/wp-json/v1/updateTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        loadData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteTicket = async (id) => {
    let findTicket = tickets[selectedIndex];
    let data = {
      id: findTicket.id,
    };
    fetch(`/wp-json/v1/deleteTicket`, {
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
      <Box sx={{ display: "flex", flexDirection: "column", width: 400 }}>
        {tickets.length === 0 ? (
          <Box
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            display="flex"
            marginTop="1px"
          >
            <Typography>
              Mevcut etiket bulunmamaktadır. Lütfen etiket ekleyiniz.
            </Typography>
          </Box>
        ) : (
          <Box>
            <TableContainer
              component={Paper}
              sx={{ width: 600, marginBottom: "20px" }}
            >
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Etiket Değeri</TableCell>
                    <TableCell align="left">Etiket Adı</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((ticket, index) => (
                    <TableRow
                      key={ticket.TicketValue}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {ticket.TicketValue}
                      </TableCell>
                      <TableCell align="left">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>{ticket.TicketName}</span>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Button
                              onClick={() => {
                                setSelectedIndex(index);
                                handleOpenDeleteTicketDialog();
                              }}
                              variant="outlined"
                              sx={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50",
                                marginRight: "0.5rem",
                              }}
                            >
                              <Delete
                                aria-label="delete"
                                size="large"
                                fontSize="inherit"
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedIndex(index);
                                handleOpenEditTicketDialog();
                              }}
                              variant="outlined"
                              sx={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50",
                              }}
                            >
                              <Edit size="large" fontSize="inherit" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            autoFocus
            variant="contained"
            onClick={handleOpenAddTicketDialog}
          >
            Yeni Etiket Ekle
          </Button>
        </Box>

        {addOpenDialog && (
          <AddTicket
            open={addOpenDialog}
            handleClickClose={handleCloseAddTicketDialog}
            saveTicket={saveTicket}
          />
        )}
        {deleteOpenDialog && (
          <DeleteTicket
            open={deleteOpenDialog}
            deleteTicket={deleteTicket}
            handleClickClose={handleCloseDeleteTicketDialog}
          />
        )}
        {editOpenDialog && (
          <EditTicket
            open={editOpenDialog}
            updateTicket={updateTicket}
            handleClickClose={handleCloseEditTicketDialog}
          />
        )}
      </Box>
    </Loading>
  );
}
