import React from "react";
import styles from "./config.module.css";
import { MenuItem, Select, Switch, TextField, Checkbox } from "@mui/material";

const ProductConfig = ({
  productPosition,
  setProductPosition,
  printerId,
  setPrinterId,
  active,
  setActive,
  qrAdd,
  setQrAdd
}) => {

  // sync something
  const handleSync = () => {
    //
  }

  return (
    <div className={styles.box}>
      <div className={styles.title}>Product Configuration</div>
      {/* row 0 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Product Position</p>
          <TextField
            fullWidth
            value={productPosition}
            onChange={(e) => setProductPosition(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="14"
          />
        </div>
        <div className={styles.column}>
          <p>Kitchen Printer</p>
          <Select
            fullWidth
            value={printerId}
            sx={{ borderRadius: "0.8rem" }}
            onChange={(e) => setPrinterId(e.target.value)}
          >
            <MenuItem value="KITCHEN1">KITCHEN1</MenuItem>
            <MenuItem value="KITCHEN2">KITCHEN2</MenuItem>
            <MenuItem value="KITCHEN3">KITCHEN3</MenuItem>
            <MenuItem value="KITCHEN4">KITCHEN4</MenuItem>
            <MenuItem value="KITCHEN5">KITCHEN5</MenuItem>
            <MenuItem value="KITCHEN6">KITCHEN6</MenuItem>
            <MenuItem value="KITCHEN7">KITCHEN7</MenuItem>
            <MenuItem value="KITCHEN8">KITCHEN8</MenuItem>
            <MenuItem value="KITCHEN9">KITCHEN9</MenuItem>
            <MenuItem value="KITCHEN10">KITCHEN10</MenuItem>
          </Select>
        </div>
      </div>

      {/* row 1 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Set Active</p>
          <Switch
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>

      <div className={styles.qrrow}>
          <Checkbox
            checked={qrAdd}
            onChange={(e) => setQrAdd(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <p>Also add in QR portal?</p>
      </div>
    </div>
  );
};

export default ProductConfig;
