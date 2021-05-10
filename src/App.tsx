import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
// import logo from './logo.svg';
import Footer from './components/home/Footer';

import Routes from './components/home/Routes';
// import MessageCreate from './components/messaging/MessageCreate';


function App() {
  return (
    <div>

      <Routes />
      <Footer />

    </div>
  );
}

export default App;
