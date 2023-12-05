import React, { useEffect, useState } from "react";
import styles from "./shopname.module.css";
import ProductItem from "../../components/product-item/ProductItem";
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
import TableView from "../../components/tableview/TableView";

function ShopnameSearch() {
  // all states
  const [district, setDistrict] = useState("");
  const [upozilla, setUpozilla] = useState("");
  const [shopname, setShopname] = useState("");
  const [startDate, setStartDate] = useState(dayjs("2022-04-17"));
  const [endDate, setEndDate] = useState(dayjs("2022-04-17"));
  const [resultList, setResultList] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");

  // Pagination loader
  const [loading, setLoading] = useState(false);

  // load result list given params
  const loadResultList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "invoices/web");
    url.searchParams.append("district", "");
    url.searchParams.append("upzila", "");
    url.searchParams.append("shopname", "");
    url.searchParams.append("startDate", "");
    url.searchParams.append("endDate", "");
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

  return (
    <>
      <div className={styles.pageTitle}>Search by District</div>
      <div className={styles.catContainer}></div>
      <div className={styles.boxContainer}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">District</InputLabel>
          <Select
            fullWidth
            value={district}
            sx={{ borderRadius: "0.8rem" }}
            onChange={(e) => setDistrict(e.target.value)}
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

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Upozilla</InputLabel>
          <Select
            fullWidth
            value={upozilla}
            sx={{ borderRadius: "0.8rem" }}
            onChange={(e) => setUpozilla(e.target.value)}
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Upozilla"
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {districtList.map((obj) => (
              <MenuItem value={obj.district}>{obj.district}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={shopname}
          onChange={(e) => setShopname(e.target.value)}
          InputProps={{ style: { borderRadius: "0.8rem" } }}
          placeholder="Iman Store"
          label="Shopname"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />

            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>

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
      <div className={styles.boxContainer}></div>
      <div className={styles.boxContainer}>
        <TableView resultList={resultList} totalAmount={totalAmount} />
      </div>
    </>
  );
}

export default ShopnameSearch;
