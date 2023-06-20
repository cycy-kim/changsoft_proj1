import React from "react";
import kendoka from "./kendoka.svg";
import "./App.css";
<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import { NavigationLayout } from "./component/NavgationLayout"
=======
import BuildingList from "./component/buildingList";
import { Route,Router, Routes } from "react-router-dom";
import { NavigationLayout } from "./component/NavgationLayout";
>>>>>>> 43b13e3aa7ab07d3a655909e541927ffaeaf924c
import { Home } from "./pages/Home";
import { Buildings } from "./pages/Buildings";

function App() {
  return (
    <div className="App">
        <NavigationLayout>
          <Routes>
            <Route path="/building_list" element={<Buildings />} />
          </Routes>
        </NavigationLayout>
    </div>
  );
}

export default App;
