import React, { useState } from "react";
import "../forms.scss";
//- Http
import axios from "axios";
import constants from "../../../../redux/constants";
// - Routing
import { withRouter } from "react-router";
// - Material
import { TextField, Button } from "@material-ui/core";

export const Register = ({ setPageState, history }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // - Immediate redirect to dashboard if successful
  const handleRegistration = () => {
    if (
      !credentials.username ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setTimeout(() => {
        setError("");
      }, 4000);
      setError("All fields are required");
      return;
    }

    axios
      .post(`${constants.BASE_URL}/user/create`, { ...credentials })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.token}`);
        history.push("/dashboard");
      })
      .catch(({ response }) => {
        setTimeout(() => {
          setError("");
        }, 4000);
        switch (response.status) {
          case 400:
            setError("Username taken");
            break;
          default:
            setError("An error occurred while creating you account");
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
      <div className="home__form">
        <h2>Register</h2>
        <div>
          <TextField
            className="home__form__input"
            label="Username"
            name="username"
            onChange={handleChange}
            value={credentials.username}
          />
          <TextField
            className="home__form__input"
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
          />
          <TextField
            className="home__form__input"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={credentials.confirmPassword}
          />
        </div>
        <p className="home__error">{error}</p>
        <div>
          <Button
            className="home__form__btn"
            variant="outlined"
            color="primary"
            onClick={handleRegistration}
          >
            Create Account Login
          </Button>
          <Button
            className="home__form__btn"
            variant="outlined"
            onClick={() => setPageState("login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
