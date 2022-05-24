
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
//import About from "./pages/About";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";
//import Search from "./pages/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
//import * as React from 'react'; 

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Header />
        
        <ToastContainer position="top-center"/>
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/add" element={<AddEdit />}/>
          <Route path="/update/:region/:id" element={<AddEdit />}/>
          <Route path="/view/:region/:id" element={<View />}/>
          {/* <Route path="/about" element={<About />}/>
          <Route path="/search" element={<Search />}/> */}
        </Routes>
      </div>
    </BrowserRouter>
    
    </>

    
  );
}


export default App;
