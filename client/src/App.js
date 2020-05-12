import React from "react";
import "./assets/scss/root/App.scss";

// - Util
import ProtectedRoute from "./util/ProtectedRoute";

// - Routing
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// - Components
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
