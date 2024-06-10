import { Button, FormControl, FormHelperText, Grid, Input, Paper } from "@mui/material";
import "../styles.css";
import { useEffect, useState } from "react";
import { SignIpForm } from "../types";
import { isEmailValid, isPasswordValid } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState<SignIpForm>({
    isValid: false,
    email: {
      isValid: false,
      value: "",
    },
    password: {
      isValid: false,
      value: "",
    },
  });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignUpForm({
      ...signUpForm,
      email: {
        value: e.target.value,
        isValid: isEmailValid(e.target.value),
      },
    });
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignUpForm({
      ...signUpForm,
      password: {
        value: e.target.value,
        isValid: isPasswordValid(e.target.value),
      },
    });

  useEffect(() => {
    let isValid = true;
    for (const key in signUpForm) {
      let typedKey = key as keyof SignIpForm;
      const value = (signUpForm[typedKey] as boolean) || signUpForm["email"];
      if (typeof value !== "boolean" && !value.isValid) isValid = false;
    }
    setSignUpForm({ ...signUpForm, isValid });
  }, [signUpForm.email.isValid, signUpForm.password.isValid]);

  const onSubmitForm = async () => {
    if (!signUpForm.isValid) return;
    try {
      await axios.post("/api/auth/signUp", {
        email: signUpForm.email.value,
        password: signUpForm.password.value,
      });
      navigate("/home");
    } catch (err) {
      console.log("err with sign up request ", err);
    }
  };

  return (
    <Grid container className="w-100 justify-content-center align-items-center d-flex auth-page-wrapper">
      <Paper className="w-25 h-50 p-5 rounded-4">
        <Grid container className="d-flex flex-column gap-5 text-center">
          <Grid item>
            <h1>Sign Up </h1>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signUpForm.email.isValid}>
              <Input error={!signUpForm["email"]["isValid"]} fullWidth type="email" placeholder="email" onChange={onEmailChange} />
              {!signUpForm.email.isValid && <FormHelperText>Invalid email address</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signUpForm.password.isValid}>
              <Input error={!signUpForm["password"]["isValid"]} fullWidth type="password" placeholder="password" onChange={onPasswordChange} />
              {!signUpForm.password.isValid && <FormHelperText>Invalid password</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            <Button onClick={onSubmitForm} variant="contained" fullWidth disabled={!signUpForm.isValid}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
