import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavigationLayout } from "./component/NavgationLayout";
import { Home } from "./pages/Home";
import { Buildings } from "./pages/Buildings";

function App() {
  return (
    <div className="App">
        <NavigationLayout>
          <Routes>
            <Route path="/building_list" element={<Home />} />
            <Route path="/building_list" element={<Buildings />} />
          </Routes>
        </NavigationLayout>
    </div>
  );
}

export default App;
