import { Button, FormControl, FormHelperText, Grid, Input, Paper } from "@mui/material";
import "../styles.css";
import { useEffect, useState } from "react";
import { SignIpForm } from "../types";
import { isEmailValid, isPasswordValid } from "../utils";
import axios from "axios";

export default () => {
  const [signInForm, setSignInForm] = useState<SignIpForm>({
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
    setSignInForm({
      ...signInForm,
      email: {
        value: e.target.value,
        isValid: isEmailValid(e.target.value),
      },
    });
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSignInForm({
      ...signInForm,
      password: {
        value: e.target.value,
        isValid: isPasswordValid(e.target.value),
      },
    });

  useEffect(() => {
    let isValid = true;
    for (const key in signInForm) {
      let typedKey = key as keyof SignIpForm;
      const value = (signInForm[typedKey] as boolean) || signInForm["email"];
      if (typeof value !== "boolean" && !value.isValid) isValid = false;
    }
    setSignInForm({ ...signInForm, isValid });
  }, [signInForm.email.isValid, signInForm.password.isValid]);

  const onSubmitForm = async () => {
    if (!signInForm.isValid) return;
    try {
      const response = await axios.post("/api/auth/signIn", {
        email: signInForm.email.value,
        password: signInForm.password.value,
      });
    } catch (err) {
      console.log("err with sign up request ", err);
    }
  };
  return (
    <Grid container className="w-100 justify-content-center align-items-center d-flex auth-page-wrapper">
      <Paper className="w-25 p-5 rounded-4">
        <Grid container className="d-flex flex-column gap-5 text-center">
          <Grid item>
            <h1>Sign In </h1>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signInForm.email.isValid}>
              <Input error={!signInForm["email"]["isValid"]} fullWidth type="email" placeholder="email" onChange={onEmailChange} />
              {!signInForm.email.isValid && <FormHelperText>Invalid email address</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth error={!signInForm.password.isValid}>
              <Input error={!signInForm["password"]["isValid"]} fullWidth type="password" placeholder="password" onChange={onPasswordChange} />
              {!signInForm.password.isValid && <FormHelperText>Invalid password</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item>
            <Button onClick={onSubmitForm} variant="contained" fullWidth disabled={!signInForm.isValid}>
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
