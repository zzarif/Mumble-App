import React, { Fragment, useEffect, useState } from "react";
import districtList from "../../constants/districtList.json";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { methods } from "../../constants/methods";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import { AppRegistration, EditOutlined } from "@mui/icons-material";
import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";


export default function UpdateGirl({ open, setOpen, data, loadGirlList }) {
  // today date mm/dd/yyyy
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const [DOB, setDOB] = useState(dayjs(data.strDOB));
  const [district, setDistrict] = useState(data.strDistrict);
  const [upozillaList, setUpozillaList] = useState([]);
  const [upozilla, setUpozilla] = useState(data.strSubLocation);

  const [name, setName] = useState(data.strName);
  const [phone, setPhone] = useState(data.strPhone);
  const [email, setEmail] = useState(data.strEmail);

  useEffect(() => {
    handleSelectDistrict();
  }, [district]);

  // handle district select
  const handleSelectDistrict = async () => {
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
  };

  const [loading, setLoading] = useState(false);
  // handle submit sign up
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      loadGirlList();
    }, 2000);
    // const data = new FormData(event.currentTarget);
    // const url = new URL(import.meta.env.VITE_API_BASE_URL + "girl");
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
    <Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 400,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontFamily="Poppins"
            fontWeight="lg"
            mb={1}
          >
            Update Girl Info
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                        <MenuItem value={obj.upazilla}>{obj.upazilla}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <LoadingButton
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={<EditOutlined />}
                variant="contained"
                sx={btn_styles2}
              >
                <span>Update Info</span>
              </LoadingButton>
            </Box>
          </Box>
        </Sheet>
      </Modal>
    </Fragment>
  );
}
