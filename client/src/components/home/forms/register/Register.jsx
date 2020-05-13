import React, { useState } from "react";
import "../forms.scss";
//- Http
import axios from "axios";
import constants from "../../../../redux/constants";
// - Routing
import { withRouter } from "react-router";
// - Material
import { TextField } from "@material-ui/core";

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
          case 409:
            setError("Username taken");
            break;
          case 400:
            setError("Passwords must match");
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
    <div className="home__form" data-test="component-register">
      <h2>New Account</h2>
      <div className="home__form__registerFields">
        <TextField
          className="home__form__input"
          label="Username"
          name="username"
          onChange={handleChange}
          value={credentials.username}
          data-test="component-register-input"
        />
        <TextField
          className="home__form__input"
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          value={credentials.password}
          data-test="component-register-input"
        />
        <TextField
          className="home__form__input"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={credentials.confirmPassword}
          data-test="component-register-input"
        />
      </div>
      <p className="home__error">{error}</p>
      <div
        className="home__form__btn"
        variant="outlined"
        color="primary"
        onClick={handleRegistration}
        data-test="component-register-btn"
      >
        <button>Register</button>
      </div>
      <p className="home__form__signUp">
        Already have an account?{" "}
        <span onClick={() => setPageState("login")}>Sign In</span>
      </p>
    </div>
  );
};

export default withRouter(Register);
