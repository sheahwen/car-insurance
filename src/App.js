import "./App.css";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Quote from "./Quote";
import Dashboard from "./Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Singpass from "./Singpass";
import Callback from "./Callback";
import Login from "./Login";
import UserContext from "./UserContext";

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
  const [userToken, setUserToken] = useState(null);
  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
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
            <Route exact path="/singpass">
              <Singpass />
            </Route>
            <Route path="/callback">
              <Callback />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </ThemeProvider>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
