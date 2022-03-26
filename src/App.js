import React from "react";
import { ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import theme from "./constant/theme";
import Dashboard from "./containers/admin/dashboard/dashboard";
import Signin from "./containers/auth/signin";
import CreateStaff from './containers/admin/CreateStaff/CreateStaff'
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-staff" element={<CreateStaff />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
