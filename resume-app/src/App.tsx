import { Route, Routes } from "react-router-dom";
import './App.scss';
import React from "react";
import { InputPage } from "./components/InputPage/InputPage";
import { ResumePage } from "./components/ResumePage/ResumePage";

export const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<InputPage />}/>
        <Route path="/:username" element={<ResumePage />}/>
        <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          ></Route>
      </Routes>
    </div>
  );
};
