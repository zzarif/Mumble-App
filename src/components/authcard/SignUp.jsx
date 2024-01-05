import React, { useState } from "react";
import styles from "./auth.module.css";
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
import { methods } from "../../constants/methods";
import { LoadingButton } from "@mui/lab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { btn_styles2 } from "../../constants/btn_styles2";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ setAuthMethod }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [district, setDistrict] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  // handle submit sign up
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name&&!phnError&&pin&&district) {
      setLoading(true);
      const url = new URL(import.meta.env.VITE_API_BASE_URL + "user");
      await fetch(url, {
        method: methods.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now(),
          name: name,
          phone: phone,
          pin: pin,
          level: 2,
          District: district,
          Active: false,
        }),
      })
        .then((res) => {
          if (res.ok) {
            setOpen(true);
          } else alert("Something went wrong!");
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
                <label className={styles.title}>Sign Up</label>
                <label className={styles.subtitle}>
                  Create new co-ordinator account
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
                      name="pin"
                      label="Pin"
                      type="password"
                      id="pin"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                        {districtList.map((obj) => (
                          <MenuItem value={obj.district}>
                            {obj.district}
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
                  startIcon={<FontAwesomeIcon icon={faSignIn} />}
                  variant="contained"
                  sx={btn_styles2}
                >
                  <span>Sign Up</span>
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() => setAuthMethod(true)}
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your application is sent to admin for approval.
        </Alert>
      </Snackbar>
    </>
  );
}
