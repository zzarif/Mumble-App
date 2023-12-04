import React, { useEffect, useState } from "react";
import styles from "./imup.module.css";
import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { methods } from "../../constants/methods";
import { Cancel, DeleteOutline, Image } from "@mui/icons-material";
import { btn_styles } from "../../constants/btn_styles";

const ImageAdd = ({selectedImage, setSelectedImage}) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        alert("Image size should be less than 20MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(file);
        setSelectedImage({
          file,
          previewURL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClear = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>Add Image</div>
      {/* row 0 */}
      <div className={styles.row}>
        {selectedImage ? (
          <div style={{ position: "relative" }}>
            <img src={selectedImage.previewURL} alt="Preview" />
            <div className={styles.dicon}>
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{ color: "white" }}
              >
                <Cancel onClick={handleImageClear} />
              </IconButton>
            </div>
          </div>
        ) : (
          <Button
            variant="contained"
            component="label"
            startIcon={<Image />}
            sx={btn_styles}
          >
            Choose Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageAdd;
