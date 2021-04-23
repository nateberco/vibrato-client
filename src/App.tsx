import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { Auth } from './components/auth/Auth';
import  ListingPublish  from './components/listing/ListingPublish';
// import Routes from './components/home/Routes';
// import Sitebar from './components/home/Sitebar';


function App() {
  return (
    <div>
      {/* <Routes /> */}
      {/* <Sitebar /> */}
      <Auth />
      <ListingPublish />

    </div>
  );
}

export default App;
