import React, { useEffect, useState } from "react";
import styles from "./girls.module.css";
import { methods } from "../../constants/methods";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { btn_styles } from "../../constants/btn_styles";
import GirlsTable from "../../components/tableview/GirlsTable";
import AddGirl from "../../components/girl-crud/AddGirl";

const GirlRegistration = () => {
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    loadGirlList();
  }, []);

  // load item list
  const loadGirlList = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "girls");
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
      <div className={styles.pageTitle}>Registered Girls</div>
      <div className={styles.bigContainer}>
        <div className={styles.colContainer}>
          <Button
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            variant="contained"
            sx={btn_styles}
          >
            <span>Register Girl</span>
          </Button>
        </div>
      </div>

      <div style={{ height: "1rem" }}></div>

      <GirlsTable resultList={resultList} loadGirlList={loadGirlList} />
      <AddGirl open={open} setOpen={setOpen} loadGirlList={loadGirlList} />

      <div style={{ height: "6rem" }}></div>
    </>
  );
};

export default GirlRegistration;
