import React, { useEffect, useState } from "react";
import styles from "./items.module.css";
import { Add, Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { btn_styles } from "../../constants/btn_styles";
import { urls } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import { methods } from "../../constants/methods";
import { btn_styles2 } from "../../constants/btn_styles2";
import ItemsTable from "../../components/tableview/ItemsTable";
import AddItem from "../../components/items-crud/AddItem";

function Items() {
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    loadItemList();
  }, []);

  // load item list
  const loadItemList = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "items");
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setResultList(obj);
      })
      .catch((err) => alert(err));
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

      <ItemsTable resultList={resultList} loadItemList={loadItemList} />
      <AddItem open={open} setOpen={setOpen} loadItemList={loadItemList} />

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default Items;
