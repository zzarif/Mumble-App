import React, { Fragment, useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import styles from "./preview.module.css";

export default function PreviewDispatch({
  open, setOpen, data
}) {

  useEffect(() => {
    console.log(data);
  },[]);

  return (
    <Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 400,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
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
          {data.map((obj,idx) => (
              <div className={styles.keyvalue} key={idx}>
                <Typography id="modal-desc" textColor="text.tertiary">
                <b>{obj.first}</b>
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                {obj.second}
                </Typography>
              </div>
          ))}
        </Sheet>
      </Modal>
    </Fragment>
  );
}