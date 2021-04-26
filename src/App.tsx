import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';

import Routes from './components/home/Routes';


function App() {
  return (
    <div>
      <Router>
          <Routes />
      </Router>

    </div>
  );
}

export default App;
