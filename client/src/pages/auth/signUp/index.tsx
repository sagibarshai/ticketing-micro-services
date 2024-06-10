import { Alert, Button, FormControl, FormHelperText, Grid, Input, Paper } from "@mui/material";
import "../styles.css";
import { useEffect, useState } from "react";
import { SignInForm } from "../types";
import { isEmailValid, isPasswordValid } from "../utils";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState<SignInForm>({
    isValid: false,
    errors: [],
    email: {
      isValid: false,
      value: "",
      showError: false,
    },
    password: {
      isValid: false,
      value: "",
      showError: false,
    },
  });

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignUpForm({
      ...signUpForm,
      email: {
        value: e.target.value,
        isValid: isEmailValid(e.target.value),
        showError: true,
      },
      errors: [],
    });
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignUpForm({
      ...signUpForm,
      password: {
        value: e.target.value,
        isValid: isPasswordValid(e.target.value),
        showError: true,
      },
      errors: [],
    });

  useEffect(() => {
    let isValid = true;
    for (const key in signUpForm) {
      let typedKey = key as keyof SignInForm;
      const value = (signUpForm[typedKey] as boolean) || signUpForm["email"];
      if (typeof value !== "boolean" && "isValid" in value && !value.isValid) isValid = false;
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
      const error = err as AxiosError<{ errors: SignInForm["errors"] }>;
      if (error.response?.data?.errors) setSignUpForm({ ...signUpForm, errors: error.response.data.errors });
    }
  };

  return (
    <Grid container className="w-100 justify-content-center align-items-center d-flex auth-page-wrapper">
      <Paper variant="outlined" className="w-25 h-auto p-5 rounded-4">
        <Grid container className="d-flex flex-column gap-5 text-center">
          <Grid item>
            <h1>Sign Up </h1>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signUpForm.email.isValid && signUpForm.email.showError}>
              <Input
                error={!signUpForm.email.isValid && signUpForm.email.showError}
                fullWidth
                type="email"
                placeholder="email"
                onChange={onEmailChange}
              />
              {!signUpForm.email.isValid && signUpForm.email.showError && <FormHelperText>Invalid email address</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signUpForm.password.isValid && signUpForm.password.showError}>
              <Input
                error={!signUpForm.password.isValid && signUpForm.password.showError}
                fullWidth
                type="password"
                placeholder="password"
                onChange={onPasswordChange}
              />
              {!signUpForm.password.isValid && signUpForm.password.showError && <FormHelperText>Invalid password</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            {signUpForm.errors.length
              ? signUpForm.errors.map((e) => (
                  <Alert variant="filled" severity="error">
                    {e.message}
                  </Alert>
                ))
              : null}
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
