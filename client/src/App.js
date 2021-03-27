import './App.css';
import React from 'react';
import { Router } from '@reach/router';
import axios from "axios";
import NewSkiff from './components/NewSkiff';
import EditSkiff from './components/EditSkiff';
import OneSkiff from './components/OneSkiff';
import AllSkiffs from './components/AllSkiffs';
import DeleteSkiff from './components/DeleteSkiff';
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
        <AllSkiffs path="/"/>
        <NewSkiff path="/skiffs/new" /> 
        <OneSkiff path="/skiff/:id" />
        <EditSkiff path="/skiff/:skiffId/edit" />
        <LogReg path="/logreg"/>
        <NotFound default /> 
      </Router>
    </div>
  );
}
export default App;