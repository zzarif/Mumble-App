import React, { useEffect, useState } from "react";
import styles from "./reports.module.css";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { methods } from "../../constants/methods";
import { Search } from "@mui/icons-material";
import districtList from "../../constants/districtList.json";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { select_styles } from "../../constants/select_styles";
import ReportsTable from "../../components/tableview/ReportsTable";
import FacebookCircularProgress from "../../components/fbspinner/FacebookCircularProgress";
import { centered } from "../../styles/centered";
import DownloadReportsAsPDF from "../../components/pdf-manager/DownloadReportsAsPDF";

function Reports() {
  // today date mm/dd/yyyy
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  // all states
  const [district, setDistrict] = useState(localStorage.getItem("mLevel") === "2"?localStorage.getItem("mDistrict"):"");

  const [upozillaList, setUpozillaList] = useState([]);
  const [upozilla, setUpozilla] = useState("");

  const [startDate, setStartDate] = useState(dayjs("01/01/2024"));
  const [endDate, setEndDate] = useState(dayjs(today));
  const [resultList, setResultList] = useState([]);

  // Pagination loader
  const [loading, setLoading] = useState(false);

  // load all reports
  useEffect(() => {
    loadResultList();
  },[]);

  // real time loading
  useEffect(() => {
    loadResultList();
  },[district,upozilla,startDate,endDate]);

  // load result list given params
  const loadResultList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "shopkeeper/report");
    url.searchParams.append("district", district);
    url.searchParams.append("upzila", upozilla);
    url.searchParams.append("startDate", startDate);
    url.searchParams.append("endDate", endDate);
    await fetch(url, {
      method: methods.GET,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((obj) => {
        setResultList(obj.result);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    (async () => {
      setUpozilla("");
      const url = new URL(import.meta.env.VITE_API_BASE_URL + "districts");
      url.searchParams.append("district", district);
      await fetch(url, {
        method: methods.GET,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((obj) => {
          setUpozillaList(obj);
        });
    })();
  }, [district]);

  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.pageTitle}>Reports</div>
        <DownloadReportsAsPDF district={district} upozilla={upozilla} startDate={startDate} endDate={endDate}/>
      </div>
      <div className={styles.bigContainer}>
        <div className={styles.colContainer}>
          <div className={styles.rowContainer0}>
            <FormControl sx={{ m: 1, minWidth: "46%" }}>
              <InputLabel id="demo-simple-select-helper-label">
                District
              </InputLabel>
              <Select
                disabled={localStorage.getItem("mLevel") === "2"}
                fullWidth
                value={district}
                sx={select_styles}
                onChange={(e) => setDistrict(e.target.value)}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="District"
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {districtList.map((obj,idx) => (
                  <MenuItem key={idx} value={obj.district}>{obj.district}</MenuItem>
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
                {upozillaList.map((obj,idx) => (
                  <MenuItem key={idx} value={obj.upazilla}>{obj.upazilla}</MenuItem>
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

          <div style={{ height: "0.5rem" }}></div>

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
        <ReportsTable resultList={resultList} />
      )}

      <div style={{ height: "6rem" }}></div>
    </>
  );
}

export default Reports;
