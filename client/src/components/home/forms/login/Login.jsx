import React, { useState } from "react";
import "../forms.scss";
// - Routing
import { withRouter } from "react-router";
// - Http
import axios from "axios";
import constants from "../../../../redux/constants";
// - Material
import { TextField, Button } from "@material-ui/core";

export const Login = ({ setPageState, history }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    axios
      .post(`${constants.BASE_URL}/user/login`, { ...credentials })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="home__form">
        <h2>Login</h2>
        <div>
          <TextField
            onChange={handleChange}
            name="username"
            value={credentials.username}
            className="home__form__input"
            label="Username"
          />
          <TextField
            onChange={handleChange}
            name="password"
            value={credentials.password}
            className="home__form__input"
            label="Password"
          />
        </div>
        <div>
          <Button
            className="home__form__btn"
            variant="outlined"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            className="home__form__btn"
            variant="outlined"
            onClick={() => setPageState("register")}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
