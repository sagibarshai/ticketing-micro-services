import { Alert, Button, FormControl, FormHelperText, Grid, Input, Paper } from "@mui/material";
import "../styles.css";
import { useEffect, useState } from "react";
import { SignInForm } from "../types";
import { isEmailValid, isPasswordValid } from "../utils";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [signInForm, setSignInForm] = useState<SignInForm>({
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
    setSignInForm({
      ...signInForm,
      email: {
        value: e.target.value,
        isValid: isEmailValid(e.target.value),
        showError: true,
      },
      errors: [],
    });
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignInForm({
      ...signInForm,
      password: {
        value: e.target.value,
        isValid: isPasswordValid(e.target.value),
        showError: true,
      },
      errors: [],
    });

  useEffect(() => {
    let isValid = true;
    for (const key in signInForm) {
      let typedKey = key as keyof SignInForm;
      const value = (signInForm[typedKey] as boolean) || signInForm["email"];
      if (typeof value !== "boolean" && "isValid" in value && !value.isValid) isValid = false;
    }
    setSignInForm({ ...signInForm, isValid });
  }, [signInForm.email.isValid, signInForm.password.isValid]);

  const onSubmitForm = async () => {
    if (!signInForm.isValid) return;
    try {
      await axios.post("/api/auth/signIn", {
        email: signInForm.email.value,
        password: signInForm.password.value,
      });
      navigate("/home");
    } catch (err) {
      console.log("err with sign in request ", err);
      const error = err as AxiosError<{ errors: SignInForm["errors"] }>;
      if (error.response?.data?.errors) setSignInForm({ ...signInForm, errors: error.response.data.errors });
    }
  };

  return (
    <Grid container className="w-100 justify-content-center align-items-center d-flex auth-page-wrapper">
      <Paper variant="outlined" className="w-25 h-auto p-5 rounded-4">
        <Grid container className="d-flex flex-column gap-5 text-center">
          <Grid item>
            <h1>Sign In </h1>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signInForm.email.isValid && signInForm.email.showError}>
              <Input
                error={!signInForm.email.isValid && signInForm.email.showError}
                fullWidth
                type="email"
                placeholder="email"
                onChange={onEmailChange}
              />
              {!signInForm.email.isValid && signInForm.email.showError && <FormHelperText>Invalid email address</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signInForm.password.isValid && signInForm.password.showError}>
              <Input
                error={!signInForm.password.isValid && signInForm.password.showError}
                fullWidth
                type="password"
                placeholder="password"
                onChange={onPasswordChange}
              />
              {!signInForm.password.isValid && signInForm.password.showError && <FormHelperText>Invalid password</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            {signInForm.errors.length
              ? signInForm.errors.map((e) => (
                  <Alert variant="filled" severity="error">
                    {e.message}
                  </Alert>
                ))
              : null}
          </Grid>
          <Grid item>
            <Button onClick={onSubmitForm} variant="contained" fullWidth disabled={!signInForm.isValid}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
