import React, { Component } from "react";
import LoginSreen from './screens/LoginScreen';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginSreen />
      </div>
    );
  }
}

export default App;
