import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import axios from "axios";
import NewString from './components/NewString';
import EditString from './components/EditString';
import OneString from './components/OneString';
import AllStrings from './components/AllStrings';
import DeleteString from './components/DeleteString';
import Header from './views/Header';
import LogReg from './views/LogReg';

function App() {

  const NotFound = () => {
    return (
      <div className="error"> Route Not Found</div>
    )
  };
  return (
    <div className="App">
      <Header />
      <Router> 
        <AllStrings path="/"/>
        <NewString path="/string/new" /> 
        <OneString path="/string/:id" />
        <EditString path="/string/:stringId/edit" />
        <LogReg path="/logreg"/>
        <NotFound default /> 
      </Router>
    </div>
  );
}
export default App;