import React, { useState } from "react";
import "../forms.scss";
// - Redux
import { connect } from "react-redux";
import { setExistingState } from "../../../../redux/actions/gameActions";
// - Routing
import { withRouter } from "react-router";
// - Http
import axios from "axios";
import constants from "../../../../redux/constants";
// - Material
import { TextField, Button } from "@material-ui/core";

export const Login = ({ setPageState, history, setExistingState }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  // - This will set the global state if previously exiting
  const handleLogin = () => {
    if (!credentials.username || !credentials.password) {
      setTimeout(() => {
        setError("");
      }, 4000);
      setError("All fields are required");
      return;
    }

    axios
      .post(`${constants.BASE_URL}/user/login`, { ...credentials })
      .then((res) => {
        setExistingState(res.data.state.game);
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        history.push("/dashboard");
      })
      .catch(({ response }) => {
        setTimeout(() => {
          setError("");
        }, 4000);
        switch (response.status) {
          case 400:
            setError("All fields are required");
            break;
          case 401:
            setError("Invalid credentials");
            break;
          default:
            setError("An error occurred while attempting to login");
            break;
        }
      });
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="home__form" data-test="LoginView">
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
            type="password"
          />
        </div>
        <p className="home__error">{error}</p>
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

export default withRouter(connect(null, { setExistingState })(Login));
