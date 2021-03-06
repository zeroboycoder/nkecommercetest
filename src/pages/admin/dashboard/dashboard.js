import React, { useState, useEffect } from "react";

import Staff from "../Staff/Staff";
import CreateProduct from "../CreateProduct/CreateProduct";
import BottomNav from "../../../components/BottomNav/BottomNav";
import "./dashboard.css";

const Dashboard = () => {
  const [currentNav, setCurrentNav] = useState(0);

  const bottomNavHandler = (value) => {
    setCurrentNav(value);
  };

  const App = () => {
    switch (currentNav) {
      case 1:
        console.log("incoming value", currentNav);
        return <Staff />;
      case 2:
        return <CreateProduct />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboardScreen">
      <App />
      <div className="bottonNavContainer">
        <BottomNav clicked={bottomNavHandler} />
      </div>
    </div>
  );
};

export default Dashboard;
