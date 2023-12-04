import React from "react";
import styles from "./pricing.module.css";
import { Switch, TextField } from "@mui/material";

const ProductPricing = ({
  unitPrice,
  setUnitPrice,
  discountAmount,
  setDiscountAmount,
  customPrice,
  setCustomPrice,
  allowPrice,
  setAllowPrice,
  serviceTax,
  setServiceTax,
  serviceCharge,
  setServiceCharge
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>Product Pricing</div>
      {/* row 0 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Unit Price</p>
          <TextField
            fullWidth
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="12.50"
          />
        </div>
        <div className={styles.column}>
          <p>Discount Amount</p>
          <TextField
            fullWidth
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            InputProps={{ style: { borderRadius: "0.8rem" } }}
            placeholder="6.50"
          />
        </div>
      </div>

      {/* row 1 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Custom Price</p>
          <Switch
            checked={customPrice}
            onChange={(e) => setCustomPrice(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div className={styles.column}>
          <p>Allow Discount</p>
          <Switch
            checked={allowPrice}
            onChange={(e) => setAllowPrice(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>

      {/* row 2 */}
      <div className={styles.row}>
        <div className={styles.column}>
          <p>Include Goods & Service Tax</p>
          <Switch
            checked={serviceTax}
            onChange={(e) => setServiceTax(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
        <div className={styles.column}>
          <p>Include Service Charge</p>
          <Switch
            checked={serviceCharge}
            onChange={(e) => setServiceCharge(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;
