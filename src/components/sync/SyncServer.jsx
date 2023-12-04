import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { btn_styles } from "../../constants/btn_styles";
import { Sync } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { methods } from "../../constants/methods";

function SyncServer() {
    const [open,setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // loading
    const [loading,setLoading] = useState(false);
    // handle sync
    const handleSync = async () => {
      setLoading(true);
      const url = new URL(import.meta.env.VITE_API_BASE_URL + "productSync");
      await fetch(url, {
        method: methods.POST,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((obj) => {
          if (obj.status === 200) {
            setOpen(true);
          }
        })
        .catch((err) => alert(err.message))
        .finally(() => setLoading(false));
    }

    return (
        <>
        <LoadingButton
          color="secondary"
          onClick={handleSync}
          loading={loading}
          loadingPosition="start"
          startIcon={<Sync />}
          variant="contained"
          sx={btn_styles}
        >
          <span>Sync All</span>
        </LoadingButton>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully synced.
        </Alert>
      </Snackbar>
        </>
    );
}

export default SyncServer;