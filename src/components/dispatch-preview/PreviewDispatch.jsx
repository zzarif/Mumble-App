import React, { Fragment, useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { DeleteOutline, Inventory2Rounded } from "@mui/icons-material";

export default function PreviewDispatch({ open, setOpen, data }) {
  return (
    <Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            minWidth: 300,
            maxHeight: 400,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            overflowY: "auto"
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontFamily="Poppins"
            fontWeight="lg"
            mb={1}
          >
            Dispatch Details
          </Typography>
          <List>
            {data.EntriesInvoices&&data.EntriesInvoices.map((item, idx) => (
              <ListItem
                key={idx}
                disableGutters
                secondaryAction={
                  <Typography id="modal-desc" textColor="text.tertiary">
                    {item.totalAmt}
                  </Typography>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <Inventory2Rounded />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.nItemCode}
                  secondary={item.unitAmt}
                />
              </ListItem>
            ))}
          </List>
          {/* {data.map((obj, idx) => (
            <div className={styles.keyvalue} key={idx}>
              <Typography id="modal-desc" textColor="text.tertiary">
                <b>{obj.first}</b>
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary">
                {obj.second}
              </Typography>
            </div>
          ))} */}
        </Sheet>
      </Modal>
    </Fragment>
  );
}
