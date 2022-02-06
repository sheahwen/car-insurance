import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Quote from "./Quote";
import Dashboard from "./Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#345995",
    },
    secondary: {
      main: "#F4FFF8",
    },
    warning: {
      main: "#FB4D3D",
    },
    error: { main: "#F6FEAA" },
    info: { main: "#EAC435" },
    success: { main: "#C7EFCF" },
  },
});

function App() {
  return (
    <div>
      <Switch>
        <ThemeProvider theme={theme}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/get-quote">
            <Quote />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </ThemeProvider>
      </Switch>
    </div>
  );
}

export default App;
