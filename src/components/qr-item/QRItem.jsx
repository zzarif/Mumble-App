import React, { useState } from "react";
import styles from "./qritem.module.css";
import { Modal } from "@mui/material";
import PreviewItem from "../item-preview/PreviewItem";

function QRItem({
  item
}) {
  // preview handles
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={styles.box} onClick={handleOpen}>
        <img src="/products/sample.jpg" alt="Sample Product"></img>
        <h3>{item.item_name}</h3>
        <h4>{(Math.round(item.unit_price * 100) / 100).toFixed(2)}</h4>
        <p>{item.description}</p>
        <button className={styles.updateBtn}>
          View
        </button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <PreviewItem
          item={item}
        />
      </Modal>
    </>
  );
}

export default QRItem;
