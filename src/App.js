import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import SuggestedPC from "./components/SuggestedPC";
import OwnPC from "./components/OwnPC";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <Routes>
          <Route path="/own-pc" element={<OwnPC />} />
          <Route path="/suggested-pc" element={<SuggestedPC />} />
        </Routes>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  navbar: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    margin: "0 10px",
  },
};

export default App;
