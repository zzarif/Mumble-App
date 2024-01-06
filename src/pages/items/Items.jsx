import React, { useEffect, useState } from "react";
import styles from "./items.module.css";
import { Add, Logout } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { btn_styles } from "../../constants/btn_styles";
import { urls } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { methods } from "../../constants/methods";
import { btn_styles2 } from "../../constants/btn_styles2";
import ItemsTable from "../../components/tableview/ItemsTable";
import AddItem from "../../components/items-crud/AddItem";
import { centered } from "../../styles/centered";
import FacebookCircularProgress from "../../components/fbspinner/FacebookCircularProgress";

function Items() {
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    loadItemList();
  }, []);

  const [loading,setLoading] = useState(false);
  // load item list
  const loadItemList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "items");
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setResultList(obj);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.pageTitle}>Items</div>
      <div className={styles.bigContainer}>
        <div className={styles.colContainer}>
          <Button
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            variant="contained"
            sx={btn_styles}
          >
            <span>Add Item</span>
          </Button>
        </div>
      </div>

      <div style={{ height: "1rem" }}></div>

      {loading? (
        <Box sx={centered}>
          <FacebookCircularProgress />
        </Box>
      ) : (
        <ItemsTable resultList={resultList} loadItemList={loadItemList} />
      )}
      
      <AddItem open={open} setOpen={setOpen} loadItemList={loadItemList} />

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default Items;
