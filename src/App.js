import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StepwisePCCustomizing from "./components/OwnPCCustomization";
import SuggestedPC from "./components/SuggestedPC";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <h1>메인페이지</h1>
        <nav style={styles.navbar}>
          <ul>
            <li>
              <Link to="/own-pc" style={styles.link}>
                상세보기 (커스텀 PC)
              </Link>
            </li>
            <li>
              <Link to="/suggested-pc" style={styles.link}>
                추천 완본체 (추천 PC)
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/own-pc" element={<StepwisePCCustomizing />} />
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
