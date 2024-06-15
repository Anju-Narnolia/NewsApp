import "./App.css";
import React, { Component } from 'react'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 9;
//  apikey= process.env.REACT_APP_NEWS_API
 apikey= "a1293d8e440e4d7cb26381e3a11107a5"
  state ={
    progress:0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  // QuerySearch = async query=>{
  //   const response=await 
  // }
  render() {
    return (
      <div>
        <Router>
        <Navbar handleSearch={this.QuerySearch} /> {/* Pass handleSearch as a prop */}
          <Routes>
            <Route exact path="/" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="general" pageSize={this.pageSize} colour={"primary"} country={"in"} category="general" />}></Route>
            <Route exact path="/sports" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="sports" pageSize={this.pageSize} colour={"success"} country={"in"} category="sports" />}></Route>
            <Route exact path="/business" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="business" pageSize={this.pageSize} colour={"danger"} country={"in"} category="business" />}></Route>
            <Route exact path="/entertainment" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="entertainment" colour={"warning"} pageSize={this.pageSize} country={"in"} category="entertainment" />}></Route>
            <Route exact path="/health" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="health" pageSize={this.pageSize} colour={"info"} country={"in"} category="health" />}></Route>
            <Route exact path="/science" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="science" pageSize={this.pageSize} colour={"dark"} country={"in"} category="science" />}></Route>
            <Route exact path="/technology" element={<Home apiKey={this.apikey} setProgress={this.setProgress} key="technology" colour={"secondary"} pageSize={this.pageSize} country={"in"} category="technology" />}></Route>
          </Routes>
        </Router>
        <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
      </div>
    );
  }
}

// 8488cb778da840eab79d8d2e4caaf03
