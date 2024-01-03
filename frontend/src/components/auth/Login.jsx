import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import { useInput } from "../../hooks/useInput";

import { hasMinLength, isEmail, isEmpty } from "../../util/validation";

import Button from "../UI/Button";
import Input from "../UI/Input";
import Sidebar from "../UI/Sidebar";
import classes from "./Login.module.css";
import axios from "axios";
import { url as fetchUrl } from "../../util/globalVariables";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const submit = useSubmit();

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && !isEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6) && !isEmpty(value));

  const logInHandler = async (e) => {
    e.preventDefault();

    submit({ method: "post" });

    if (emailHasError || passwordHasError) {
      setApiError("Incorrect email or password");
      return;
    }

    try {
      setLoading(true);

      const login = await axios({
        method: "post",
        url: `${fetchUrl}/auth/login`,
        data: {
          email: emailValue,
          password: passwordValue,
        },
      });
      const responseType = await axios.get(`${fetchUrl}/api/v1/auth/type`, {
        params: {
          email: emailValue,
        },
      });
      setApiError("");
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("type", responseType.data.type);
      navigate("/homepage");
      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        setApiError("Incorrect email or password");
      }
      setLoading(false);
    }
  };

  const signUpRouteHandler = () => {
    navigate("/signup");
  };

  return (
    <form method="post" className={classes.form} onSubmit={logInHandler}>
      <Sidebar />
      <div className={classes.fields}>
        <div className={classes["signup"]}>
          <p>Don't have an account?</p>
          <button type="button" onClick={signUpRouteHandler}>
            Create Account
          </button>
        </div>
        <div className={classes.login}>
          <h1>Log into MoviMint</h1>
          <Input
            label="Email Address"
            type="text"
            id="email"
            name="email"
            required={true}
            onBlur={handleEmailBlur}
            value={emailValue}
            onChange={handleEmailChange}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            required={true}
            value={passwordValue}
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            error={apiError}
          />
          {loading ? (
            <ClipLoader color={"#3d4958"} loading={loading} size={35} />
          ) : (
            <Button type="submit">Sign in</Button>
          )}
        </div>
        <div className={classes.information}>
          <h2>
            Log in as an admin to be able to edit or delete a movie. <br />
            Email: muhamedsljivic@gmail.com
            <br />
            Password: 123456
          </h2>
        </div>
      </div>
    </form>
  );
};

export default Login;
