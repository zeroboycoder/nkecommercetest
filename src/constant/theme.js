import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0E185F",
    },
    secondary: {
      main: localStorage.getItem("color"),
    },
  },
});

export default theme;
