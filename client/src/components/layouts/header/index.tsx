import { AppBar, Box, List, ListItem, Toolbar } from "@mui/material";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./styles.css";

export default () => {
  return (
    <Box>
      <AppBar component={"nav"}>
        <Toolbar className="d-flex gap-4 justify-content-end align-items-center">
          <NavLink className={({ isActive }) => `header-nav-link ${isActive && "header-nav-link-active"}`} to={"/auth/signIn"}>
            Sign In
          </NavLink>
          <NavLink className={({ isActive }) => `header-nav-link ${isActive && "header-nav-link-active"}`} to={"/auth/signUp"}>
            Sign Up
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
