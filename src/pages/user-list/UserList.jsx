import React, { useEffect, useState } from "react";
import styles from "./users.module.css";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { methods } from "../../constants/methods";
import UsersTable from "../../components/tableview/UsersTable";
import FacebookCircularProgress from "../../components/fbspinner/FacebookCircularProgress";
import { centered } from "../../styles/centered";

function UserList() {
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    loadResultList();
  }, []);

  const [loading, setLoading] = useState(false);
  // load result list given params
  const loadResultList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "users");
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setResultList(obj);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className={styles.pageTitle}>Co-ordinators</div>

      {loading? (
        <Box sx={centered}>
          <FacebookCircularProgress />
        </Box>
      ) : (
        <UsersTable resultList={resultList} setResultList={setResultList}/>
      )}

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default UserList;
