import React, { useState } from 'react';
import styles from "./auth.module.css";
import districtList from "./districtList.json";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material';
import { select_styles } from '../../constants/select_styles';
import { methods } from '../../constants/methods';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { btn_styles2 } from '../../constants/btn_styles2';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ setAuthMethod }) {

    
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

  const [open,setOpen] = useState(false);
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
    },2000);
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
        <Container sx={{borderRadius:"0.5rem",backgroundColor:"white"}} component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <div className={styles.headContainer}>
            <label className={styles.title}>Sign Up</label>
            <label className={styles.subtitle}>Create new co-ordinator account</label>
        </div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                        name="pin"
                        label="Pin"
                        type="password"
                        id="pin"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: "100%"}}>
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
                            <MenuItem value={obj.district}>{obj.district}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl sx={{ minWidth: "100%"}}>
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
                    startIcon={<FontAwesomeIcon icon={faSignIn} />}
                    variant="contained"
                    sx={btn_styles2}
                >
                    <span>Sign Up</span>
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link sx={{cursor:"pointer"}} onClick={() => setAuthMethod(true)} variant="body2">
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
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            You may login after admin verification
          </Alert>
        </Snackbar>
    </>
    
  );
}