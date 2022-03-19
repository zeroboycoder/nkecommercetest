import { Typography } from "@mui/material";
import React from "react";

import BottomNav from "../../../components/BottomNav/BottomNav";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboardScreen">
      <Typography variant="h2" className="adminTitle" color="primary">
        Admin Dashboard
      </Typography>
      <div className="bottonNavContainer">
        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;
