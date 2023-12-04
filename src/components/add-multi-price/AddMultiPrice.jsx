import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import styles from "./addmult.module.css";
import { btn_styles } from "../../constants/btn_styles";
import MyAlert from "../alerts/MyAlert";
import { LoadingButton } from "@mui/lab";
import { Add } from "@mui/icons-material";
import { methods } from "../../constants/methods";

const AddMultiPrice = ({ nSkuCode, UOM, setMultiPriceList }) => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [position, setPosition] = useState("");
  const [allowDiscount, setAllowDiscount] = useState(false);

  // loading spinner
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  // add new multi price
  const addMultiPrice = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL+"multiPrice");
    await fetch(url, {
      method: methods.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nSkuCode: nSkuCode,
        strMultiDesc: description,
        nType: 1,//default 1 
        nQty: quantity,
        mPrice: price,
        bWholeSales: false,//default
        nPosition: position,
        nMultiCode: Math.floor((new Date().getTime()/10000)),// random int - can use time since epoch
        mUOM: UOM,//product eom
        mDiscount: allowDiscount
      }),
    })
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        if (obj.status === 200) {
          setSuccessful(true);
          reloadMultiPrice();
        };
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  // Reload with new multi price list
  const reloadMultiPrice = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL
      +import.meta.env.VITE_API_PRODUCT);
    url.searchParams.append("nSkuCode",nSkuCode);
    console.log(String(url));
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        setMultiPriceList(obj.data.multiPrice);
      });
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>Add New Multi Price</div>

      {/* row 0 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Description</p>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="Heineken Bot"
          />
        </div>
      </div>

      {/* row 1 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Price</p>
          <TextField
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="14.5"
          />
        </div>
        <div className={styles.column}>
          <p>Quantity</p>
          <TextField
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="12"
          />
        </div>
      </div>

      {/* row 2 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Position</p>
          <TextField
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="14"
          />
        </div>
        <div className={styles.column}>
          <p>Allow Discount</p>
          <Switch
            checked={allowDiscount}
            onChange={(e) => setAllowDiscount(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>
      <MyAlert
        open={successful}
        setOpen={setSuccessful}
        message={"Multu price added successfully."}
      />
      <LoadingButton
        color="secondary"
        onClick={addMultiPrice}
        loading={loading}
        loadingPosition="start"
        startIcon={<Add />}
        variant="contained"
        sx={btn_styles}
      >
        <span>Add Multi Price</span>
      </LoadingButton>
    </div>
  );
};

export default AddMultiPrice;
