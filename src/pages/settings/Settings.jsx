import React, { useEffect, useState } from 'react';
import styles from "./settings.module.css";
import { methods } from '../../constants/methods';
import { Logout } from '@mui/icons-material';
import { Button } from '@mui/material';
import { btn_styles } from '../../constants/btn_styles';
import { urls } from '../../constants/urls';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [code,setCode] = useState("");
  const [port,setPort] = useState("");

  // get details on load
  useEffect(() => {
    getDetails();
  },[]);

  // get details
  const getDetails = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL+"detail");
    await fetch(url,{
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json())
    .then((obj) => {
      if(obj.status===200) {
        setName(obj.data.name);
        setCode(obj.data.code);
        setPort(obj.data.PortNo);
      } else {
        alert("Something went wrong");
      }
    })
    .catch((err) => alert(err));
  }

  // logout
  const handleLogout = () => {
    localStorage.removeItem("coobiz");
    navigate(urls.LANDING_PAGE);
  }

  return (
    <>
      <div className={styles.pageTitle}>Settings</div>
      <div className={styles.boxContainer}>

        <div className={styles.box}>
          <div className={styles.title}>Name</div>
          <div className={styles.row}>
            <div className={styles.column}>
              <p>{name}</p>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>Code</div>
          <div className={styles.row}>
            <div className={styles.column}>
              <p>{code}</p>
            </div>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>Port</div>
          <div className={styles.row}>
            <div className={styles.column}>
              <p>{port}</p>
            </div>
          </div>
        </div>

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
  )
}

export default Settings;