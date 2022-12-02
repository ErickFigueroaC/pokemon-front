import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { blueGrey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
