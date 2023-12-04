import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import AddCondiment from "../add-condiment/AddCondiment";
import styles from "./cond.module.css";
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

const Condiments = ({ nSkuCode, nCategoryCode, condiments }) => {
  // Condiments
  const [condimentList, setCondimentList] = useState(condiments);

  // handle add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // deletion success message
  const [successful, setSuccessful] = useState(false);

  // delete condiment
  const handleRemoveCondiment = async (nCondimentId) => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL
      +import.meta.env.VITE_API_CONDIMENT);
    url.searchParams.append("nCondimentId",nCondimentId);
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
          reloadCondiments();
        };
      })
      .catch((err) => console.log(err));
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
      <div className={styles.title}>Condiments</div>
      <List>
        {condimentList.map((condiment, idx) => (
          <ListItem
            key={idx}
            disableGutters
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteOutline
                  onClick={() => handleRemoveCondiment(condiment.nCondimentId)}
                />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <Inventory2Rounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={condiment.strCondimentDesc}
              secondary={condiment.ftAddPrice}
            />
          </ListItem>
        ))}
      </List>
      <MyAlert
        open={successful}
        setOpen={setSuccessful}
        message={"Condiment successfully deleted."}
      />
      <button className={styles.addCondBtn} onClick={handleOpen}>
        <FontAwesomeIcon icon={faAdd} /> Add New Condiment
      </button>
      <Modal open={open} onClose={handleClose}>
        <AddCondiment
          setCondimentList={setCondimentList}
          nSkuCode={nSkuCode}
          nCategoryCode={nCategoryCode}
        />
      </Modal>
    </div>
  );
};

export default Condiments;
