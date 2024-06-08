import { Button, Grid, Input, Paper } from "@mui/material";

export default () => {
  return (
    <Grid style={{ height: "100vh" }} container className="w-100 justify-content-center align-items-center d-flex">
      <Paper className="w-25 p-5 rounded-4">
        <Grid container className="d-flex flex-column gap-5 text-center">
          <Grid item>
            <h1>Login !</h1>
          </Grid>
          <Grid item>
            <Input fullWidth type="email" placeholder="email" />
          </Grid>
          <Grid item>
            <Input fullWidth type="password" placeholder="password" />
          </Grid>
          <Grid item>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
