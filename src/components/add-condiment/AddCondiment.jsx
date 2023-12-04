import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import { btn_styles } from "../../constants/btn_styles";
import styles from "./addcond.module.css";
import { Add } from "@mui/icons-material";
import { methods } from "../../constants/methods";
import { LoadingButton } from "@mui/lab";
import MyAlert from "../alerts/MyAlert";

const AddCondiment = ({
  nSkuCode,
  nCategoryCode,
  setCondimentList,
}) => {
  const [description, setDescription] = useState("");
  const [addOnPrice, setAddOnPrice] = useState("");
  const [position, setPosition] = useState("");
  const [active, setActive] = useState(false);

  // loading spinner
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  // add new condiment
  const addCondiment = async () => {
    setLoading(true);
    // setTimeout(() => {setLoading(false);setSuccessful(true);},2000);
    const url = new URL(import.meta.env.VITE_API_BASE_URL
      +import.meta.env.VITE_API_CONDIMENT);
    console.log(String(url));
    await fetch(url, {
      method: methods.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        strCondimentDesc: description,
        nCategoryCode: nCategoryCode,
        ftAddPrice: addOnPrice,
        bActive: Boolean(active),
        cdmPosition: Number(position),
        strColor: "0", //default
        nSkuCode: nSkuCode,
        nCondiType: null, //default
        imgCondi: null,
      }),
    })
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        if (obj.status === 200) {
          setSuccessful(true);
          reloadCondiments();
        };
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  // Reload with new condiment list
  const reloadCondiments = async () => {
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
        setCondimentList(obj.data.condiments);
      });
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>Add New Condiment</div>

      {/* row 0 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Description</p>
          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="Medium crust"
          />
        </div>
      </div>

      {/* row 1 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Add On Price</p>
          <TextField
            fullWidth
            value={addOnPrice}
            onChange={(e) => setAddOnPrice(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="14.00"
          />
        </div>
        <div className={styles.column}>
          <p>Position</p>
          <TextField
            fullWidth
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="1"
          />
        </div>
      </div>

      {/* row 2 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Set Active</p>
          <Switch
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
      <MyAlert
        open={successful}
        setOpen={setSuccessful}
        message={"Condiment added successfully."}
      />
      <LoadingButton
        color="secondary"
        onClick={addCondiment}
        loading={loading}
        loadingPosition="start"
        startIcon={<Add />}
        variant="contained"
        sx={btn_styles}
      >
        <span>Add Condiment</span>
      </LoadingButton>
    </div>
  );
};

export default AddCondiment;
