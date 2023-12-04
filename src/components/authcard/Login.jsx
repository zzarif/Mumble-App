import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./auth.module.css";
import { urls } from "../../constants/urls";
import { Alert, Snackbar, TextField } from "@mui/material";
import { in_props } from "../../constants/in_props";
import { LoadingButton } from "@mui/lab";
import { btn_styles2 } from "../../constants/btn_styles2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { inlab_props } from "../../constants/inlab_props";
import { methods } from "../../constants/methods";
import ErrorAlert from "../alerts/ErrorAlert";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [open,setOpen] = useState(false);

  const [loading,setLoading] = useState(false);
  // google log in
  const login = async () => {
    setLoading(true);
    setTimeout(() => {
      if(username==="admin"&&password==="admin") {
        localStorage.setItem("mumble","mumble");
        navigate(urls.DISTRICT);
        setLoading(false);
      }
      else setOpen(true);
    },2000);
  };

  return (
    <div className={styles.card} data-aos="fade-up">
      <div className={styles.headContainer}>
        <label className={styles.title}>Log In</label>
        <label className={styles.subtitle}>Login to your account</label>
      </div>
      <TextField
        fullWidth
        type="email"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        InputLabelProps={inlab_props}
        InputProps={in_props}
        placeholder="Admin"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={inlab_props}
        InputProps={in_props}
      />
      <ErrorAlert
        open={open}
        setOpen={setOpen}
        message={"Invalid Credentials"}
      />
      <LoadingButton
        onClick={login}
        loading={loading}
        loadingPosition="start"
        startIcon={<FontAwesomeIcon icon={faSignIn} />}
        variant="contained"
        sx={btn_styles2}
      >
        <span>Login</span>
      </LoadingButton>
    </div>
  );
};

export default Login;
