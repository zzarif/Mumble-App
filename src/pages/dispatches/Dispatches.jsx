import React, { useEffect, useState } from "react";
import styles from "./dispatch.module.css";
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
import { Search } from "@mui/icons-material";
import districtList from "./districtList.json";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DispatchTable from "../../components/tableview/DispatchTable";
import { in_props } from "../../constants/in_props";
import { select_styles } from "../../constants/select_styles";

function Dispatches() {
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

  const [shopnameList, setShopnameList] = useState([]);
  const [shopname, setShopname] = useState("");

  const [startDate, setStartDate] = useState(dayjs(today));
  const [endDate, setEndDate] = useState(dayjs(today));
  const [resultList, setResultList] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  // Pagination loader
  const [loading, setLoading] = useState(false);

  // load result list given params
  const loadResultList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "invoices/web");
    url.searchParams.append("district", district);
    url.searchParams.append("upzila", upozilla);
    url.searchParams.append("shopname", shopname);
    url.searchParams.append("startDate", startDate);
    url.searchParams.append("endDate", endDate);
    console.log(String(url));
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setResultList(obj.result);
        setTotalAmount(obj.total[0].totalAmount);
        setLoading(false);
      });
  };

  // handle district select
  const handleSelectDistrict = async (s_district) => {
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

  // handle upozilla select
  const handleSelectUpozilla = async (s_upozilla) => {
    setUpozilla(s_upozilla);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "shopkeepers");
    url.searchParams.append("upzila", s_upozilla);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setShopnameList(obj);
      });
  };

  return (
    <>
      <div className={styles.pageTitle}>Dispatches</div>
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
                Upozilla
              </InputLabel>
              <Select
                fullWidth
                value={upozilla}
                sx={select_styles}
                onChange={(e) => handleSelectUpozilla(e.target.value)}
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
                Shopname
              </InputLabel>
              <Select
                fullWidth
                value={shopname}
                sx={select_styles}
                onChange={(e) => setShopname(e.target.value)}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Shopname"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {shopnameList.map((obj) => (
                  <MenuItem value={obj.shopname}>{obj.shopname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <div className={styles.rowContainer2}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) =>
                    setStartDate(new Date(newValue).toUTCString())
                  }
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) =>
                    setEndDate(new Date(newValue).toUTCString())
                  }
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>

          <div style={{ height: "1rem" }}></div>

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

      <div style={{ height: "2rem" }}></div>

      <DispatchTable resultList={resultList} totalAmount={totalAmount} />

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default Dispatches;