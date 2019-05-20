import React from "react";

import "./App.css";
import "typeface-roboto";

import NavigationBar from "./shared/NavigationBar";
import AppRouter from "./Router";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavigationBar />
      <AppRouter />
    </div>
  );
};

export default App;
