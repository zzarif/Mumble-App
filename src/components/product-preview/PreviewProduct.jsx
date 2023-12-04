import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { urls } from "../../constants/urls";
import styles from "./preview.module.css";
import { Button } from "@mui/material";
import { Delete, Update } from "@mui/icons-material";
import { btn_styles } from "../../constants/btn_styles";
import MyAlert from "../alerts/MyAlert";
import { LoadingButton } from "@mui/lab";
import { methods } from "../../constants/methods";

const PreviewProduct = ({ product }) => {
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate("/" + urls.UPDATE_PRODUCT, {
      state: { product },
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "product");
    url.searchParams.append("nSkuCode", product.nSkuCode);
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

  // loading
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.box}>
      <div className={styles.cropped}>
        <img src="/products/sample.jpg" alt="Sample Product"></img>
      </div>
      <h3>{product.strItemDesc}</h3>
      <h4>{(Math.round(product.ftUnitPrice * 100) / 100).toFixed(2)}</h4>
      <p>{product.strRemarks}</p>
      {product.multiPrice.length > 0 && (
        <div className={styles.lists}>
          <h3>Multi Price</h3>
          {product.multiPrice.map((obj, idx) => (
            <div key={idx}>
              <p>{obj.strMultiDesc}</p>
              <p>{(Math.round(obj.mPrice * 100) / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      {product.condiments.length > 0 && (
        <div className={styles.lists}>
          <h3>Condiments</h3>
          {product.condiments.map((condiment, idx) => (
            <div key={idx}>
              <p>{condiment.strCondimentDesc}</p>
              <p>{(Math.round(condiment.ftAddPrice * 100) / 100).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      <div className={styles.row}>
        <Button
          variant="contained"
          component="label"
          startIcon={<Update />}
          onClick={handleUpdate}
          sx={btn_styles}
        >
          <span>Update</span>
        </Button>
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
      </div>
      <MyAlert
        open={open}
        setOpen={setOpen}
        message={"Product deleted successfully."}
      />
    </div>
  );
};

export default PreviewProduct;
