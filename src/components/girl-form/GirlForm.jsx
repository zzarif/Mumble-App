import React, { useState } from "react";
import styles from "./gforms.module.css";
import districtList from "../../constants/districtList.json";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { methods } from "../../constants/methods";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import { AppRegistration } from "@mui/icons-material";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function GirlForm() {
  // today date mm/dd/yyyy
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const [DOB, setDOB] = useState(dayjs(today));

  const [district, setDistrict] = useState("");

  const [upozillaList, setUpozillaList] = useState([]);
  const [upozilla, setUpozilla] = useState("");

  // handle district select
  const handleSelectDistrict = async (s_district) => {
    setDistrict(s_district);
    setUpozilla("");
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  // handle submit sign up
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 2000);
    // const data = new FormData(event.currentTarget);
    // const url = new URL(import.meta.env.VITE_API_BASE_URL + "user");
    // await fetch(url, {
    //   method: methods.POST,
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: data.get("name"),
    //     phone: data.get("phone"),
    //     pin: data.get("pin"),
    //     district: district,
    //     upzilla: upozilla
    //   })
    // }).then((res) => {
    //   if(!res.ok) {
    //     setOpen(true);
    //   }
    //   else return res.json();
    // }).then((obj) => {
    //     //
    //   })
    //   .finally(() => setLoading(false));
  };

  return (
    <>
      <div className={styles.card} data-aos="fade-up">
        <ThemeProvider theme={defaultTheme}>
          <Container
            sx={{ borderRadius: "0.5rem", backgroundColor: "white" }}
            component="main"
            maxWidth="xs"
          >
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={styles.headContainer}>
                <label className={styles.title}>Girl Registration</label>
                <label className={styles.subtitle}>
                  Register new girl account
                </label>
              </div>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="email"
                      label="Email"
                      id="email"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <DatePicker
                          label="Date of Birth"
                          value={DOB}
                          onChange={(newValue) =>
                            setDOB(new Date(newValue).toUTCString())
                          }
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        District
                      </InputLabel>
                      <Select
                        fullWidth
                        value={district}
                        onChange={(e) => handleSelectDistrict(e.target.value)}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="District"
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        {districtList.map((obj) => (
                          <MenuItem value={obj.district}>
                            {obj.district}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: "100%" }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Upozilla
                      </InputLabel>
                      <Select
                        fullWidth
                        value={upozilla}
                        onChange={(e) => setUpozilla(e.target.value)}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Upozilla"
                      >
                        <MenuItem value="">
                          <em>Select</em>
                        </MenuItem>
                        {upozillaList.map((obj) => (
                          <MenuItem value={obj.upazilla}>
                            {obj.upazilla}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<AppRegistration />}
                  variant="contained"
                  sx={btn_styles2}
                >
                  <span>Register</span>
                </LoadingButton>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Girl registration successful
        </Alert>
      </Snackbar>
    </>
  );
}
