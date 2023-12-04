import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import AddMultiPrice from "../add-multi-price/AddMultiPrice";
import styles from "./multi.module.css";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";
import { DeleteOutline, Inventory2Rounded } from "@mui/icons-material";
import { methods } from "../../constants/methods";
import MyAlert from "../alerts/MyAlert";

const MultiPrice = ({ nSkuCode, UOM, multiPrice }) => {
  // Multi price
  const [multiPriceList, setMultiPriceList] = useState(multiPrice);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // deletion success message
  const [successful, setSuccessful] = useState(false);

  // handle remove multi price
  const handleRemoveMultiPrice = async (nMultiCode) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL+"multiPrice");
    url.searchParams.append("nMultiCode",nMultiCode);
    console.log(String(url));
    await fetch(url, {
      method: methods.DELETE,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj);
        if (obj.status === 200) {
          setSuccessful(true);
          reloadMultiPrice();
        };
      })
      .catch((err) => console.log(err));
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
      <div className={styles.title}>Multi Price</div>
      <List>
        {multiPriceList.map((obj, idx) => (
          <ListItem key={idx}
            disableGutters
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteOutline onClick={() => handleRemoveMultiPrice(obj.nMultiCode)}/>
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Inventory2Rounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={obj.strMultiDesc}
              secondary={obj.mPrice}
            />
          </ListItem>
        ))}
      </List>
      <MyAlert
        open={successful}
        setOpen={setSuccessful}
        message={"Multi price successfully deleted."}
      />
      <button className={styles.addMultiBtn} onClick={handleOpen}>
        <FontAwesomeIcon icon={faAdd} /> Add New Multi Price
      </button>
      <Modal open={open} onClose={handleClose}>
        <AddMultiPrice
          nSkuCode={nSkuCode}
          UOM={UOM}
          setMultiPriceList={setMultiPriceList}
        />
      </Modal>
    </div>
  );
};

export default MultiPrice;
