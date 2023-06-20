import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import kendoka from './kendoka.svg';
import './App.css';
import BuildingList from './component/buildingList';

function App() {
  return (
    <div className="App">
      <BuildingList />
    </div>
  );
}

export default App;
