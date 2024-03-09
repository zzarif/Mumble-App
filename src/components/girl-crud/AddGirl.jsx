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
import { AppRegistration } from "@mui/icons-material";
import { Modal, ModalClose, Sheet, Typography } from "@mui/joy";


export default function AddGirl({ open, setOpen, loadGirlList }) {
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
  const [unionList, setUnionList] = useState([{"union":"Noakhali"},{"union":"Ashwadia"},{"union":"Noannoi"},{"union":"Char Matua"},{"union":"Anderchar"}]);
  const [union,setUnion] = useState("");

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [fatherName,setFatherName] = useState("");
  const [motherName,setMotherName] = useState("");

  useEffect(() => {
    handleSelectDistrict();
  },[district]);

  // handle district select
  const handleSelectDistrict = async () => {
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
    if(name&&!phnError&&DOB&&district&&upozilla) {
      setLoading(true);
      const url = new URL(import.meta.env.VITE_API_BASE_URL + "girl");
      await fetch(url, {
        method: methods.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          strName: name,
          strPhone: phone,
          strDistrict: district,
          strSubLocation: upozilla,
          strUnion : union,
          strDOB: DOB,
          father: fatherName,
          mother: motherName,
          code: null,
          active: false
        })
      }).then((res) => {
        if(res.ok) {
          setOpen(false);
          loadGirlList();
        }
        else alert("Something went wrong.");
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
    } else alert("Please provide the required fields.");
  };

  const [phnError, setPhnError] = useState(false);
  // handle phone number validation
  const handleInputChange = (value) => {
    const truncVal = value.slice(0, 11);
    setPhone(truncVal);
    setPhnError(!/^\d{11}$/.test(truncVal));
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
            Register New Girl
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
                    value={phone}
                    onChange={(e) => handleInputChange(e.target.value)}
                    type="number"
                    error={phnError}
                    helperText={
                      phnError ? "Phone number must be 11 digits" : ""
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="father"
                    label="Father Name"
                    name="father"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="mother"
                    label="Mother Name"
                    name="mother"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        label="Date of Birth"
                        value={dayjs(DOB)}
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
                      District *
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
                      {districtList.map((obj,idx) => (
                        <MenuItem key={idx} value={obj.district}>{obj.district}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Upazilla *
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
                      {upozillaList.map((obj,idx) => (
                        <MenuItem key={idx} value={obj.upazilla}>{obj.upazilla}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {district === "Noakhali" && (
                  <Grid item xs={12}>
                    <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      Union *
                    </InputLabel>
                    <Select
                      fullWidth
                      value={union}
                      onChange={(e) => setUnion(e.target.value)}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Union"
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {unionList.map((obj,idx) => (
                        <MenuItem key={idx} value={obj.union}>{obj.union}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                )}
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
        </Sheet>
      </Modal>
    </Fragment>
  );
}
