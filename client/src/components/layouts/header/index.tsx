import { AppBar, Box, Toolbar } from "@mui/material";

import { NavLink, useNavigate } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/auth/currentUser");
        if (response.data?.user) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } catch (err) {
        setIsAuthenticated(false);
        console.log("err ", err);
      }
    })();
  }, [window.location.pathname]);

  useEffect(() => {
    isAuthenticated ? navigate("/home") : navigate("/auth/signUp");
  }, [isAuthenticated]);

  return (
    <Box>
      <AppBar component={"nav"}>
        <Toolbar className="d-flex gap-4 justify-content-between align-items-center">
          <h3>Ticketing App</h3>
          <div className="ml-auto d-flex gap-4 justify-content-end align-items-center">
            {isAuthenticated ? (
              <NavLink className={({ isActive }) => `header-nav-link ${isActive && "header-nav-link-active"}`} to={"/auth/signOut"}>
                Sign Out
              </NavLink>
            ) : (
              <>
                <NavLink className={({ isActive }) => `header-nav-link ${isActive && "header-nav-link-active"}`} to={"/auth/signIn"}>
                  Sign In
                </NavLink>
                <NavLink className={({ isActive }) => `header-nav-link ${isActive && "header-nav-link-active"}`} to={"/auth/signUp"}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
