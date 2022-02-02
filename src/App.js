import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Quote from "./Quote";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/get-quote">
          <Quote />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
