import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <div className="container">
          <Routes>
            {/* <Route path='/' element={<Home/>} /> */}
            <Route path="/" element={<PrivateRoute component={Home} />} />
            <Route path="about" element={<About />} />
            <Route path="register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
