import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavigationLayout } from "./component/NavgationLayout";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";

function App() {
  return (
    <div className="App">
        <NavigationLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </NavigationLayout>
    </div>
  );
}

export default App;
