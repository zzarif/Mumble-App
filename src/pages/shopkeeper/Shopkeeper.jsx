import React, { useEffect, useState } from "react";
import styles from "./shopkeeper.module.css";
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
import { Search } from "@mui/icons-material";
import districtList from "../../constants/districtList.json";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import { select_styles } from "../../constants/select_styles";
import ShopkeeperTable from "../../components/tableview/ShopkeeperTable";
import FacebookCircularProgress from "../../components/fbspinner/FacebookCircularProgress";
import { centered } from "../../styles/centered";

function Shopkeeper() {
  // today date mm/dd/yyyy
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  // all states
  const [district, setDistrict] = useState("");

  const [upozillaList, setUpozillaList] = useState([]);
  const [upozilla, setUpozilla] = useState("");

  const [status, setStatus] = useState("");

  const [resultList, setResultList] = useState([]);

  // Pagination loader
  const [loading, setLoading] = useState(false);

  // fetch all on load
  useEffect(() => {
    (async () => {
      setLoading(true);
      const url = new URL(import.meta.env.VITE_API_BASE_URL + "shopkeepers");
      url.searchParams.append("district", "");
      url.searchParams.append("upzila", "");
      url.searchParams.append("status", "");
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
    })();
  },[]);

  // load result list given params
  const loadResultList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "shopkeepers");
    url.searchParams.append("district", district);
    url.searchParams.append("upzila", upozilla);
    url.searchParams.append("status", status);
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

  // handle district select
  const handleSelectDistrict = async (s_district) => {
    setUpozilla("");
    setDistrict(s_district);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "districts");
    url.searchParams.append("district", s_district);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setUpozillaList(obj);
      });
  };

  return (
    <>
      <div className={styles.pageTitle}>Shopkeeper Management</div>
      <div className={styles.bigContainer}>
        <div className={styles.colContainer}>
          <div className={styles.rowContainer0}>
            <FormControl sx={{ m: 1, minWidth: "46%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                District
              </InputLabel>
              <Select
                fullWidth
                value={district}
                sx={select_styles}
                onChange={(e) => handleSelectDistrict(e.target.value)}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="District"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {districtList.map((obj) => (
                  <MenuItem value={obj.district}>{obj.district}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: "46%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Upazilla
              </InputLabel>
              <Select
                fullWidth
                value={upozilla}
                sx={select_styles}
                onChange={(e) => setUpozilla(e.target.value)}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Upozilla"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {upozillaList.map((obj) => (
                  <MenuItem value={obj.upazilla}>{obj.upazilla}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.rowContainer1}>
            <FormControl sx={{ m: 1, minWidth: "100%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                Status
              </InputLabel>
              <Select
                fullWidth
                value={status}
                sx={select_styles}
                onChange={(e) => setStatus(e.target.value)}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Shopname"
              >
                <MenuItem value="approved">
                  Approved
                </MenuItem>
                <MenuItem value="pending">
                  Pending
                </MenuItem>
                <MenuItem value="rejected">
                  Rejected
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className={styles.rowContainer1}>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<Search />}
              onClick={loadResultList}
              variant="contained"
              sx={btn_styles2}
            >
              <span>Search</span>
            </LoadingButton>
          </div>
        </div>
      </div>

      <div style={{ height: "1rem" }}></div>

      {loading? (
        <Box sx={centered}>
          <FacebookCircularProgress />
        </Box>
      ) : (
        <ShopkeeperTable resultList={resultList} setResultList={setResultList} />
      )}

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default Shopkeeper;
