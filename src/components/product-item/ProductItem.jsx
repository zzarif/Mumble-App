import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urls } from "../../constants/urls";
import styles from "./proditem.module.css";
import { Modal } from "@mui/material";
import PreviewProduct from "../product-preview/PreviewProduct";

function ProductItem({
  product
}) {
  const navigate = useNavigate();

  // preview handles
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = () => {
    navigate("/" + urls.UPDATE_PRODUCT, {
      state: {product},
    });
  };

  return (
    <>
      <div className={styles.box} onClick={handleOpen}>
        <img src="/products/sample.jpg" alt="Sample Product"></img>
        <h3>{product.strItemDesc}</h3>
        <h4>{(Math.round(product.ftUnitPrice * 100) / 100).toFixed(2)}</h4>
        <p>{product.strRemarks}</p>
        <button className={styles.updateBtn} onClick={handleUpdate}>
          View
        </button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <PreviewProduct
          product={product}
        />
      </Modal>
    </>
  );
}

export default ProductItem;
