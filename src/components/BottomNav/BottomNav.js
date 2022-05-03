import * as React from "react";
import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  DashboardOutlined,
  AccountCircleOutlined,
  Upload,
  LocalMallOutlined,
  History,
} from "@mui/icons-material";
import "./BottomNav.css";

const BottomNav = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.clicked(newValue);
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BottomNavigationAction
          label="Dashboard"
          icon={<DashboardOutlined />}
        />
        <BottomNavigationAction
          label="Account"
          icon={<AccountCircleOutlined />}
        />
        <BottomNavigationAction label="Upload" icon={<Upload />} />
        <BottomNavigationAction label="Order" icon={<LocalMallOutlined />} />
        <BottomNavigationAction label="History" icon={<History />} />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
