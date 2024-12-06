import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SuggestedPC from "./components/SuggestedPC";
import OwnPC from "./components/OwnPC";
import Order from "./components/Order";
import OrderSuccess from "./components/OrderSuccess";

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <h1>페이지</h1>
        <nav style={styles.navbar}>
          <ul>
            <li>
              <Link to="/own-pc" style={styles.link}>
                커스텀PC
              </Link>
            </li>
            <li>
              <Link to="/suggested-pc" style={styles.link}>
                추천PC
              </Link>
            </li>
            <li>
              <Link to="/order" style={styles.link}>
                구매
              </Link>
            </li>
            <li>
              <Link to="/order-success" style={styles.link}>
                구매완료
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/own-pc" element={<OwnPC />} />
          <Route path="/suggested-pc" element={<SuggestedPC />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-success" element={<OrderSuccess />} />
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
