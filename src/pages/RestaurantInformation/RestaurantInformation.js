import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Loading from "../../components/Loading";
import { useTranslation } from "react-i18next";

export default function RestaurantInformation({ selectedBranch }) {
  const [name, setName] = React.useState(selectedBranch.BranchName || "");
  const [address, setAddress] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState(null);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };
  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
  };
  const handleChangeTelephone = (event) => {
    setTelephone(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleClickUpdate = () => {
    updateRestaurantInfo();
  };

  React.useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    setLoading(true);
    fetch(`/wp-json/v1/getRestaurantInfoByBranchId/${selectedBranch.id}`)
      .then((res) => res.json())
      .then((res) => {
        let branch = res.branch[0];
        setSelectedId(parseInt(branch.id));
        setName(branch.BranchName);
        setAddress(branch.Address);
        setCountry(branch.Country);
        setCity(branch.City);
        setDistrict(branch.District);
        setTelephone(branch.Telephone);
        setEmail(branch.Email);
      })
      .catch((er) => {
        console.log(er);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateRestaurantInfo = async () => {
    try {
      const response = await fetch(`/wp-json/v1/updateRestaurantInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedId,
          branchName: name,
          address: address,
          country: country,
          city: city,
          district: district,
          telephone: telephone,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Restoran bilgilerini güncelleme başarısız oldu");
      }

      loadData();
    } catch (error) {
      console.error("Restoran bilgilerini güncelleme hatası:", error.message);
    }
  };

  return (
    <Loading loading={loading}>
      <React.Fragment>
        <Box sx={{ width: 300, height: 300 }}>
          <Card
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Typography
              id="alert-dialog-title"
              justifyContent="center"
              alignItems="center"
              display="flex"
              marginTop="1rem"
              fontSize="20px"
              marginBottom="5px"
            >
              {t("restaurantInfo")}
            </Typography>

            <CardContent>
              <Box
                sx={{
                  textAlign: "center",
                  height: "400px",
                }}
              >
                <TextField
                  value={name}
                  onChange={handleChangeName}
                  id="outlined-basic"
                  label={t("branchName")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
                <TextField
                  value={address}
                  onChange={handleChangeAddress}
                  id="outlined-basic"
                  label={t("address")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
                <TextField
                  value={country}
                  onChange={handleChangeCountry}
                  id="outlined-basic"
                  label={t("country")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
                <TextField
                  value={city}
                  onChange={handleChangeCity}
                  id="outlined-basic"
                  label={t("city")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
                <TextField
                  value={district}
                  onChange={handleChangeDistrict}
                  id="outlined-basic"
                  label={t("district")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
                <TextField
                  value={telephone}
                  onChange={handleChangeTelephone}
                  id="outlined-basic"
                  label={t("telephone")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
                <TextField
                  value={email}
                  onChange={handleChangeEmail}
                  id="outlined-basic"
                  label={t("email")}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: "35px", height: "30px" }}
                />
              </Box>
            </CardContent>

            <CardActions
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginBottom: "15px",
                marginTop: "46px",
              }}
            >
              <Button
                updateRestaurantInfo={updateRestaurantInfo}
                onClick={() => {
                  setSelectedId(0);
                  handleClickUpdate();
                }}
                variant="contained"
                autoFocus
              >
                {t("save")}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </React.Fragment>
    </Loading>
  );
}
