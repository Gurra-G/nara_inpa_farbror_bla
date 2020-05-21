import React from "react";
import Dashboard from "./components/containers/Dashboard";
import AuthIsLoaded from "./components/authentication/AuthIsLoaded";
// import AuthIsLoaded from

function App() {
  return (
    <AuthIsLoaded>
      <div classname="App">
        <Dashboard />
      </div>
    </AuthIsLoaded>
  );
}

export default App;
