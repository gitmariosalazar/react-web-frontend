import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../css/login_style.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Users } from "../models/Models";
import { ToastContainer } from "react-toastify";
import NavBar from "./NavBar";
import { useState } from "react";
import { ToastCustom } from "../utils/Message";
import { InputsValidate } from "../utils/Validations";
import Loglefth from "./Loglefth";

function Copyright(props) {
  const url = "https://app-sqlserver-python-two.vercel.app/";
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="#0078FF" href={url} className="f">
        My Web Site by Mario Salazar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
function Login() {
  let [mylogin, setMylogin] = useState(false);
  let [id_user, setIdUser] = useState("");
  let [password, setPassword] = useState("");
  let [user, setUser] = useState([]);
  const handleChangeUserName = async (e) => {
    setIdUser(e.target.value);
  };
  const handleChangePassword = async (e) => {
    setPassword(e.target.value);
  };
  const url = "https://app-sqlserver-python-two.vercel.app/";
  let data = {
    id_user: id_user,
    password: password,
  };
  data.id_user = id_user;
  data.password = password;
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputarray = [data.id_user, data.password];
    const valuesarray = ["Email or Username", "Password"];
    const validate = InputsValidate(inputarray, valuesarray);

    if (validate.length === 0) {
      axios
        .post(url + "users/login_user/" + data.id_user + "/" + data.password)
        .then((res) => {
          let response = res.data;
          if (response.token != null) {
            Users.user = jwtDecode(response.token).user;
            let s = Users.user;
            setUser(s);
            document.getElementById("form").style.display = "none";
            setMylogin(true);
            <NavBar user={user} />;
            ToastCustom(
              "success",
              response.message +
                " \nWelcome Dear " +
                s.person.first_name +
                " " +
                s.person.last_name,
              "Login Successfull!"
            );
          } else {
            ToastCustom("error", response.message, "Error message!");
          }
        })
        .catch((error) => {
          setMylogin(false);
        });
    } else {
      validate.forEach((element) => {
        ToastCustom(element.severety, element.detail, element.summary);
      });
    }
  };
  return (
    <div>
      <div className="login" id="form">
        <div className="login-main">
          <div className="box-login">
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs" className="main">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign in
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                    className="box"
                  >
                    <div className="container-login">
                      <div className="input-login">
                        <div className="icon-log">
                          <span className="material-symbols-outlined">
                            mail_lock
                          </span>
                        </div>
                        <div className="input-log">
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChangeUserName}
                          />
                        </div>
                      </div>
                      <div className="input-login">
                        <div className="icon-log">
                          <span className="material-symbols-outlined">
                            vpn_key
                          </span>
                        </div>
                        <div className="input-log">
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChangePassword}
                          />
                        </div>
                      </div>
                    </div>

                    <FormControlLabel
                      className="rem"
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <div className="forgot-pwd">
                      <div className="link-forgot">
                        <Link href="#" variant="body2" className="f">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="link-forgot">
                        <Link href="/users" variant="body2" className="f">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </div>
                    </div>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </div>
          <div className="box-login">
            <div className="main">
              <Loglefth />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {mylogin && <NavBar user={user} />}
    </div>
  );
}

export default Login;
