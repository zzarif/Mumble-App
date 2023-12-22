import React, { Fragment, useEffect, useState } from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { Box, Grid, TextField } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import { methods } from "../../constants/methods";

export default function UpdateItem({ open, setOpen, data, loadItemList }) {
  const [name, setName] = useState(data.name);
  const [max, setMax] = useState(data.max);
  const [price, setPrice] = useState(data.price);

  const [loading, setLoading] = useState(false);
  // handle update
  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "item");
    url.searchParams.append("id", data.id);
    await fetch(url, {
      method: methods.PUT,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        max: max,
        price: price,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setOpen(false);
          loadItemList();
        }
        else alert("Something went wrong");
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

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
            maxWidth: 400,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
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
            Update Item
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleUpdate}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="max"
                  label="Max"
                  name="max"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  type="number"
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="start"
              startIcon={<EditOutlined />}
              variant="contained"
              sx={btn_styles2}
            >
              <span>Update Item</span>
            </LoadingButton>
          </Box>
        </Sheet>
      </Modal>
    </Fragment>
  );
}
