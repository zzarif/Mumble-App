import React, { useState } from "react";
import styles from "./preview.module.css";
import { Alert, Snackbar, Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Cancel, Check, Delete } from "@mui/icons-material";
import { btn_styles } from "../../constants/btn_styles";
import MyAlert from "../alerts/MyAlert";
import { methods } from "../../constants/methods";

const PreviewItem = ({ item }) => {
  const [active,setActive] = useState(item.active);

  // load sync
  const [loading, setLoading] = useState(false);
  // delete item
  const handleDelete = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "item");
    url.searchParams.append("nSkuCode", item.id);
    await fetch(url, {
      method: methods.DELETE,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        if (obj.status === 200) {
          setOpen(true);
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const [open, setOpen] = useState(false);
  
  // handle sync
  const handleActive = async (checked) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "items/updateStatus");
    url.searchParams.append("nSkuCode", item.id);
    await fetch(url, {
      method: methods.PUT,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        active:checked
      })
    })
      .then((res) => res.json())
      .then((obj) => {
        if (obj.status === 200) {
          setActive(checked);
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={styles.box}>
      <div className={styles.cropped}>
        <img src="/products/sample.jpg" alt="Sample Product"></img>
      </div>
      <h3>{item.item_name}</h3>
      <h4>{(Math.round(item.unit_price * 100) / 100).toFixed(2)}</h4>
      <p>{item.description}</p>
      {item.multiPrice.length > 0 && (
        <div className={styles.lists}>
          <h3>Multi Price</h3>
          {item.multiPrice.map((obj, idx) => (
            <div key={idx}>
              <p>{obj.item_name}</p>
              <p>{(Math.round(obj.unit_price * 100) / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      {item.condiments.length > 0 && (
        <div className={styles.lists}>
          <h3>Condiments</h3>
          {item.condiments.map((condiment, idx) => (
            <div key={idx}>
              <p>{condiment.item_name}</p>
              <p>{(Math.round(condiment.unit_price * 100) / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      <div className={styles.row}>
        <LoadingButton
          color="secondary"
          onClick={handleDelete}
          loading={loading}
          loadingPosition="start"
          startIcon={<Delete />}
          variant="contained"
          sx={btn_styles}
        >
          <span>Delete</span>
        </LoadingButton>
        <Switch
          checked={active}
          onChange={(e) => handleActive(e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
        />
      </div>
      <MyAlert
        open={open}
        setOpen={setOpen}
        message={"Item deleted successfully."}
      />
    </div>
  );
};

export default PreviewItem;
