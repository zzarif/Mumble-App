import React, { useEffect, useState } from "react";
import styles from "./girls.module.css";
import { methods } from "../../constants/methods";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Add, Menu, QrCode, Search } from "@mui/icons-material";
import { btn_styles } from "../../constants/btn_styles";
import GirlsTable from "../../components/tableview/GirlsTable";
import AddGirl from "../../components/girl-crud/AddGirl";
import FacebookCircularProgress from "../../components/fbspinner/FacebookCircularProgress";
import { centered } from "../../styles/centered";
import districtList from "../../constants/districtList.json";
import DownloadGirlsAsPDF from "../../components/pdf-manager/DownloadGirlsAsPDF";
import { btn_styles2 } from "../../constants/btn_styles2";
import { LoadingButton } from "@mui/lab";
import { select_styles } from "../../constants/select_styles";
import Footer from "../../components/footer/Footer";
import UploadGirlsAsPDF from "../../components/pdf-manager/UploadGirlsAsPDF";

const GirlRegistration = () => {
  const [district, setDistrict] = useState(localStorage.getItem("mLevel") === "2"?localStorage.getItem("mDistrict"):"");
  const [upozillaList, setUpozillaList] = useState([]);
  const [upozilla, setUpozilla] = useState("");
  const [resultList, setResultList] = useState([]);

  // useEffect(() => {
  //   loadGirlList();
  // }, []);

  // useEffect(() => {
  //   loadGirlList();
  // }, [district,upozilla]);

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

  const [loading, setLoading] = useState(false);
  // load item list
  const loadGirlList = async () => {
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "girls");
    url.searchParams.append("district",district);
    url.searchParams.append("strSubLocation",upozilla);
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

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.pageTitle}>Registered Girls</div>
        <DownloadGirlsAsPDF resultList={resultList}/>
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
          
          <div className={styles.rowContainer0}>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              startIcon={<Search />}
              onClick={loadGirlList}
              variant="contained"
              sx={btn_styles2}
            >
              <span>Search</span>
            </LoadingButton>
            <Button
              startIcon={<Add />}
              onClick={() => setOpen(true)}
              variant="contained"
              sx={btn_styles2}
            >
              <span>Register Girl</span>
            </Button>
            <UploadGirlsAsPDF />
          </div>
        </div>
      </div>

      <div style={{ height: "1rem" }}></div>

      {loading? (
        <Box sx={centered}>
          <FacebookCircularProgress />
        </Box>
      ) : (
          <GirlsTable resultList={resultList} loadGirlList={loadGirlList} /> 
      )}

      <AddGirl open={open} setOpen={setOpen} loadGirlList={loadGirlList} />

      {resultList.length === 0 && <Footer position={"fixed"} />}
      
      <div style={{ height: "6rem" }}></div>
    </>
  );
};

export default GirlRegistration;
