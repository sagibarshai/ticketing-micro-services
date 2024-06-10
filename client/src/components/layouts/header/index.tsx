import { AppBar, Box, Toolbar } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect } from "react";
import axios from "axios";

export default () => {
  const navigate = useNavigate();

  const isAuthenticated = async (): Promise<boolean> => {
    try {
      const response = await axios.get("/api/auth/currentUser");
      if (response.data?.user) return true;
      return false;
    } catch (err) {
      console.log("err ", err);
      return false;
    }
  };

  useEffect(() => {
    const executeIsAuthenticated = async () => {
      const isAuth = await isAuthenticated();
      console.log("isAuth ", isAuth);
      if (isAuth) navigate("/home");
      else navigate("/auth/signUp");
    };
    executeIsAuthenticated();
  }, []);

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
