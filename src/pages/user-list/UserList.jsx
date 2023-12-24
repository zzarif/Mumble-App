import React, { useEffect, useState } from "react";
import styles from "./users.module.css";
import {
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

function UserList() {
  const [resultList, setResultList] = useState([]);

  useEffect(() => {
    loadResultList();
  }, []);

  // load result list given params
  const loadResultList = async () => {
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "users");
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setResultList(obj);
      });
  };

  return (
    <>
      <div className={styles.pageTitle}>Co-ordinators</div>

      <UsersTable resultList={resultList} setResultList={setResultList}/>

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default UserList;
