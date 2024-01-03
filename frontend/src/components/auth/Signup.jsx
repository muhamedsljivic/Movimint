import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import classes from "./Signup.module.css";
import Button from "../UI/Button";
import Sidebar from "../UI/Sidebar";
import Input from "../UI/Input";
import { useInput } from "../../hooks/useInput";
import { isEmail, hasMinLength, isEmpty } from "../../util/validation";
import axios from "axios";
import { url as fetchUrl } from "../../util/globalVariables";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && !isEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6) && !isEmpty(value));

  const {
    value: nameValue,
    handleInputChange: handleNameChange,
    hasError: nameHasError,
  } = useInput("", (value) => hasMinLength(value, 3) && !isEmpty(value));

  const {
    value: surnameValue,
    handleInputChange: handleSurnameChange,
    hasError: surnameHasError,
  } = useInput("", (value) => hasMinLength(value, 2) && !isEmpty(value));

  const {
    value: phoneNumberValue,
    handleInputChange: handlePhoneNumberChange,
    hasError: phoneNumberHasError,
  } = useInput("", (value) => hasMinLength(value, 6) && !isEmpty(value));

  const loginRouteHandler = () => {
    navigate("/");
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    if (nameHasError) {
      setNameError("Name must have at least 3 characters!");
    } else {
      setNameError("");
    }

    if (surnameHasError) {
      setSurnameError("Surname must have at least 3 characters!");
    } else {
      setSurnameError("");
    }

    if (phoneNumberHasError) {
      setPhoneNumberError("Wrong phone number. (38762311517)");
    } else {
      setPhoneNumberError("");
    }

    if (emailHasError) {
      setEmailError("Wrong email entered. (johndoe@gmail.com)");
    } else {
      setEmailError("");
    }

    if (passwordHasError) {
      setPasswordError("Password must have at least 6 characters.");
    } else {
      setPasswordError("");
    }

    try {
      setLoading(true);

      const response = await axios({
        method: "post",
        url: `${fetchUrl}/auth/check-email`,
        data: {
          email: emailValue,
        },
      });

      if (!response.data.exists) {
        try {
          const signup = await axios({
            method: "post",
            url: `${fetchUrl}/auth/register`,
            data: {
              name: nameValue,
              surname: surnameValue,
              phoneNumber: phoneNumberValue,
              email: emailValue,
              password: passwordValue,
            },
          });
          const responseType = await axios.get(`${fetchUrl}/api/v1/auth/type`, {
            params: {
              email: emailValue,
            },
          });

          localStorage.setItem("token", signup.data.token);
          localStorage.setItem("type", responseType.data.type);

          navigate("/homepage");
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setEmailError("Email already exists");
      setLoading(false);
    }
  };

  return (
    <form method="POST" className={classes.form} onSubmit={signUpHandler}>
      <Sidebar />
      <div className={classes.fields}>
        <div className={classes.login}>
          <p>Already have an account</p>
          <button type="button" onClick={loginRouteHandler}>
            Login
          </button>
        </div>
        <div className={classes.signup}>
          <h1>Sign in into MoviMint</h1>

          <Input
            label="Name"
            type="text"
            id="name"
            name="name"
            required={true}
            onChange={handleNameChange}
            value={nameValue}
            error={nameError}
          />
          <Input
            label="Surname"
            type="text"
            id="surname"
            name="surname"
            required={true}
            onChange={handleSurnameChange}
            value={surnameValue}
            error={surnameError}
          />
          <Input
            label="Phone Number"
            type="tel"
            id="phone-number"
            name="phone-number"
            required={true}
            onChange={handlePhoneNumberChange}
            value={phoneNumberValue}
            error={phoneNumberError}
          />

          <Input
            label="Email Address"
            type="text"
            id="email"
            name="email"
            required={true}
            value={emailValue}
            onChange={handleEmailChange}
            error={emailError}
          />

          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
            required={true}
            value={passwordValue}
            onChange={handlePasswordChange}
            error={passwordError}
          />

          {loading ? (
            <ClipLoader color={"#3d4958"} loading={loading} size={35} />
          ) : (
            <Button type="submit">Sign up</Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default SignUp;
