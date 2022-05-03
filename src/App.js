import React from "react";
import { ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import theme from "./constant/theme";
import Dashboard from "./pages/admin/dashboard/dashboard";
import Signin from "./pages/auth/Signin";
import CreateStaff from "./pages/admin/CreateStaff/CreateStaff";
import CreateProduct from "./pages/admin/CreateProduct/CreateProduct";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-staff" element={<CreateStaff />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
