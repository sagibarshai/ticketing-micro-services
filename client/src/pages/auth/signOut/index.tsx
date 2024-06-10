import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        await axios.post("/api/auth/signOut");
        navigate("/auth/signIn");
      } catch (err) {
        console.log("Error signing out:", err);
      }
    })();
  }, []);
  return <div />;
};
