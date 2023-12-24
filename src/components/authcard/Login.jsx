import React, { useState } from 'react';
import styles from "./auth.module.css";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Snackbar } from '@mui/material';
import { methods } from '../../constants/methods';
import { LoadingButton } from '@mui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { btn_styles2 } from '../../constants/btn_styles2';
import { urls } from '../../constants/urls';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login({ setAuthMethod }) {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const [open,setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loading, setLoading] = useState(false);
  // handle submit sign up
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = new URL(import.meta.env.VITE_API_BASE_URL + "user");
    await fetch(url, {
      method: methods.POST,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: phone,
        pin: pin
      })
    }).then((res) => {
      if(res.ok) return res.json();
      else alert("Invalid Credentials");
    })
    .then((obj) => {
        if(obj) {
            if(obj.Active) {
                localStorage.setItem("mumble","mumble");
                localStorage.setItem("mLevel",obj.level);
                navigate(urls.GIRL_REGISTRATION);
            } else setOpen(true);
        }
    })
    .catch((err) => alert(err))
    .finally(() => setLoading(false));
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
            <label className={styles.title}>Login</label>
            <label className={styles.subtitle}>Login to your account</label>
        </div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
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
                        autoFocus
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
                </Grid>
                <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<FontAwesomeIcon icon={faSignIn} />}
                    variant="contained"
                    sx={btn_styles2}
                >
                    <span>Login</span>
                </LoadingButton>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link sx={{cursor:"pointer"}} onClick={() => setAuthMethod(false)} variant="body2">
                        Don't have an account? Sign up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    </div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Account not verified yet.
          </Alert>
        </Snackbar>
    </>
    
  );
}