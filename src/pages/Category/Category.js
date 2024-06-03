import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";
import { pages } from "../App";
import Loading from "../../components/Loading";
import SelectLanguage from "../../components/SelectLanguage/SelectLanguage";
import { useTranslation } from "react-i18next";

export default function Category({
  setPage,
  setSelectedCategory,
  selectedBranch,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [editOpenDialog, setEditOpenDialog] = useState(false);
  const [deleteOpenDialog, setDeleteOpenDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const handleOpenAddDialog = () => {
    setAddOpenDialog(true);
  };

  const handleCloseAddDialog = () => {
    setAddOpenDialog(false);
  };
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

  const getBranch = localStorage.getItem("adminSelectedBranch");

  React.useEffect(() => {
    loadData();
  }, [selectedLanguage.id]);

  const loadData = async () => {
    if (selectedLanguage && getBranch) {
      setLoading(true);
      fetch(
        `/wp-json/v1/getCategoriesByBranchIDAndLanguageID/${
          JSON.parse(getBranch)?.id
        }/${parseInt(selectedLanguage?.id || 0)}`
      )
        .then((res) => res.json())
        .then((res) => {
          setCategories(res.categories);
        })
        .catch((er) => {
          console.log(er);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPage(pages.Branch);
    }
  };
  const saveCategory = async (categoryName, categoryImage) => {
    const formData = new FormData();
    formData.append("branchId", JSON.parse(getBranch)?.id);
    formData.append("categoryName", categoryName);
    formData.append("categoryImage", categoryImage);
    formData.append("languageId", selectedLanguage?.id);

    fetch("/wp-json/v1/saveCategory", {
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
  const editCategory = async (categoryName, categoryImage) => {
    const editedCategory = categories[selectedIndex];
    const categoryId = editedCategory.id;
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    if (categoryImage) {
      formData.append("categoryImage", categoryImage);
    }
    formData.append("id", categoryId);

    fetch(`/wp-json/v1/updateCategory`, {
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

  const deleteCategory = async () => {
    let findCategory = categories[selectedIndex];

    let data = {
      id: findCategory.id,
    };
    fetch(`/wp-json/v1/deleteCategory`, {
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
      <Grid container alignItems="center">
        {item?.CategoryImage?.includes?.("uploads") && (
          <Grid item xs={12}>
            <CardMedia
              sx={{
                width: "100%",
                height: "180px",
                maxHeight: "50%",
                objectFit: "contain",
              }}
              component="img"
              src={item.CategoryImage}
              alt={item.CategoryName}
            />
          </Grid>
        )}
        <Grid item xs={12} sx={{ marginTop: "20px" }}>
          <Box display="flex" flexDirection="column" height="100%">
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography>{item.CategoryName}</Typography>
              </Grid>
              <Grid item xs={8}>
                <div style={{ marginLeft: "66px" }}>
                  <Button
                    onClick={() => {
                      setSelectedIndex(index);
                      handleOpenEditDialog();
                    }}
                    variant="outlined"
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "50",
                      marginRight: "0.5rem",
                    }}
                  >
                    <Edit size="large" fontSize="inherit" />
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedIndex(index);
                      handleOpenDeleteDialog();
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
                      setSelectedCategory(item);
                      setPage(pages.MenuItem);
                    }}
                    variant="outlined"
                    sx={{
                      width: "1.5rem",
                      height: "1.5rem",
                      borderRadius: "50",
                    }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  };
  return (
    <Loading>
      <Box component="div" sx={{ width: 450 }}>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
        <Loading loading={loading}>
          {categories?.length === 0 ? (
            <Box
              textAlign={"center"}
              alignItems="center"
              justifyContent="center"
              display="flex"
              marginTop="1px"
            >
              <Typography>{t("notFoundCategoryText")}</Typography>
            </Box>
          ) : (
            categories?.map?.((value, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  maxWidth: 600,
                  marginBottom: "10px",
                  padding: 1,
                  background: "white",
                }}
              >
                <CardActions disableSpacing>
                  <Box
                    container
                    flex={1}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    marginTop={"10px"}
                  >
                    <CardItem index={index} item={value} />
                  </Box>
                </CardActions>
              </Card>
            ))
          )}
        </Loading>

        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={handleOpenAddDialog}>
            {t("addCategory")}
          </Button>
        </Box>

        {addOpenDialog && (
          <AddCategory
            saveCategory={saveCategory}
            open={addOpenDialog}
            handleClickClose={handleCloseAddDialog}
          />
        )}
        {editOpenDialog && (
          <EditCategory
            selectedCategory={categories[selectedIndex]}
            editCategory={editCategory}
            open={editOpenDialog}
            handleClickClose={handleCloseEditDialog}
          />
        )}
        {deleteOpenDialog && (
          <DeleteCategory
            deleteCategory={deleteCategory}
            open={deleteOpenDialog}
            handleClickClose={handleCloseDeleteDialog}
          />
        )}
      </Box>
    </Loading>
  );
}
