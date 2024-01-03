import React from "react";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";
import Store from "./redux/Store";
import { Provider } from 'react-redux'
import Landing from "./pages/Landing";


const App = () => {
  return (
    <>
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/editor/:id" element={<Editor/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </Provider>
    </>
  );
};

export default App;
