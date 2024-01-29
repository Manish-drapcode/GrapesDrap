import logo from './logo.svg';
import './App.css';

import React,{Component} from 'react';
import {Routes,Route} from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login.js';
import Dashboard from './component/dashboard';

class App extends Component{
  render(){
 console.log("history of app ", this.props.history);
   return (<div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Login history={this.props.history} />} />
        
        <Route path="/Signup" element={<Signup></Signup>}  />.
        <Route path="/dashboard" element={<Dashboard></Dashboard>}  />

        </Routes>
      </header>
    </div>)
  
  }
}

export default App;
