import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    payment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Placed:", formData);
    localStorage.removeItem("cart"); // Clear cart after order
    navigate("/success");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h1>Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" onChange={handleChange} required />
        </div>
        <div>
          <label>Payment Method:</label>
          <select name="payment" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
