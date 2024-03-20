import React, { useState, Fragment } from "react";
import { LoadingButton } from "@mui/lab";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import { Close, FileCopy, Image, Upload } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { downloadBtn } from "../../constants/downloadBtn";
import { btn_styles2 } from "../../constants/btn_styles2";
import { methods } from "../../constants/methods";

function UploadGirlsAsPDF() {
  // button loading
  const [loading, setLoading] = useState(false);
  // submit function
  const submitExcel = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "excel");
    await fetch(url, {
      method: methods.POST,
      body: formData,
    })
      .then((res) => res.json())
      .then((obj) => {
        if (obj.status === 200) {
          alert("Bulk registration successful.");
          setFile(null);
          setOpen(false);
        } else alert("File upload error.");
      })
      .catch((err) => {
        alert("File upload error.");
      })
      .finally(() => setLoading(false));
  };

  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  return (
    <>
      <Button
        startIcon={<Upload />}
        onClick={() => setOpen(true)}
        variant="contained"
        sx={btn_styles2}
      >
        <span>Bulk Registration</span>
      </Button>
      <Fragment>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              minWidth: "40rem",
              maxHeight: 400,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              overflowY: "auto",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />

            {file && (
              <Box
                sx={{
                  p: "1rem",
                  mt: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "0.1rem solid gray",
                  borderRadius: "0.5rem",
                }}
              >
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <FileCopy />
                  <Typography fontFamily={"Poppins"}>
                    <b>{file.name}</b>
                  </Typography>
                  <Typography>
                    {(Math.round((file.size / 1000) * 100) / 100).toFixed(2)} KB
                  </Typography>
                </Box>
                <IconButton onClick={() => setFile(null)}>
                  <Close />
                </IconButton>
              </Box>
            )}
            {file ? (
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<Upload />}
                onClick={submitExcel}
                variant="contained"
                sx={downloadBtn}
              >
                <span>Submit File</span>
              </LoadingButton>
            ) : (
              <Button
                variant="contained"
                component="label"
                startIcon={<FileCopy />}
                sx={downloadBtn}
              >
                Select File
                <input
                  hidden
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                  }}
                />
              </Button>
            )}
          </Sheet>
        </Modal>
      </Fragment>
    </>
  );
}

export default UploadGirlsAsPDF;
