import React from "react";
import styles from "./settings.module.css";
import { Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { btn_styles } from "../../constants/btn_styles";
import { urls } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  // logout
  const handleLogout = () => {
    localStorage.removeItem("mumble");
    localStorage.removeItem("mLevel");
    navigate(urls.LANDING_PAGE);
  };

  return (
    <>
      <div className={styles.pageTitle}>Settings</div>
      <div className={styles.boxContainer}>
        <div className={styles.box}>
          <div className={styles.title}>Logout</div>
          <div className={styles.row}>
            <Button
              variant="contained"
              component="label"
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={btn_styles}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
