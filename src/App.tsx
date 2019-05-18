import React from "react";
import NavigationBar from "./shared/NavigationBar";

import "./App.css";
import "typeface-roboto";
import Dashboard from "./dashboard/Dashboard";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <Dashboard />
    </div>
  );
};

export default App;
