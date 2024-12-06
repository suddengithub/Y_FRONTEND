import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState({
    items: [
      {
        name: "Product A",
        quantity: 1,
        price: 100,
        options: "Color: Red, Size: M",
      },
      {
        name: "Product B",
        quantity: 2,
        price: 200,
        options: "Color: Blue, Size: L",
      },
    ],
    shippingCost: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "Credit Card",
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shippingMethod: "Standard",
  });

  const [message, setMessage] = useState("");

  // 주문 요약 계산
  const calculateTotal = () => {
    const subtotal = orderSummary.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total =
      subtotal +
      orderSummary.shippingCost +
      orderSummary.tax -
      orderSummary.discount;
    setOrderSummary((prevState) => ({
      ...prevState,
      total: total,
    }));
  };

  // 결제 정보 핸들러
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 배송 정보 핸들러
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 결제 처리
  const handlePlaceOrder = () => {
    navigate("/order-success");
    if (
      !paymentInfo.cardNumber ||
      !paymentInfo.expiryDate ||
      !paymentInfo.cvv
    ) {
      setMessage("결제 정보를 모두 입력해주세요.");
      return;
    }
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      setMessage("배송 정보를 모두 입력해주세요.");
      return;
    }
    setMessage("결제 중입니다...");
    setTimeout(() => {
      setMessage("주문이 완료되었습니다!");
    }, 2000); // 2초 후 주문 완료 메시지
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>주문 페이지</h1>

      {/* 주문 요약 (Order Summary) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 요약</h2>
        <ul style={styles.list}>
          {orderSummary.items.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <p>{item.name}</p>
              <p>수량: {item.quantity}</p>
              <p>가격: ${item.price}</p>
              <p>옵션: {item.options}</p>
            </li>
          ))}
        </ul>
        <p style={styles.summary}>
          소계: $
          {orderSummary.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </p>
        <p>배송비: ${orderSummary.shippingCost}</p>
        <p>세금: ${orderSummary.tax}</p>
        <p>총액: ${orderSummary.total}</p>
      </section>

      {/* 결제 정보 (Payment Information) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>결제 정보</h2>
        <label>결제 수단:</label>
        <select
          name="paymentMethod"
          value={paymentInfo.paymentMethod}
          onChange={handlePaymentChange}
          style={styles.select}
        >
          <option value="Credit Card">신용카드</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">계좌 이체</option>
        </select>
        {paymentInfo.paymentMethod === "Credit Card" && (
          <div>
            <label>카드 번호:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentChange}
              style={styles.input}
              required
            />
            <label>유효 기간:</label>
            <input
              type="text"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handlePaymentChange}
              style={styles.input}
              required
            />
            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentChange}
              style={styles.input}
              required
            />
          </div>
        )}
      </section>

      {/* 배송 정보 (Shipping Information) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>배송 정보</h2>
        <label>이름:</label>
        <input
          type="text"
          name="name"
          value={shippingInfo.name}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>연락처:</label>
        <input
          type="text"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>이메일:</label>
        <input
          type="email"
          name="email"
          value={shippingInfo.email}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>주소:</label>
        <input
          type="text"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>도시:</label>
        <input
          type="text"
          name="city"
          value={shippingInfo.city}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>우편번호:</label>
        <input
          type="text"
          name="postalCode"
          value={shippingInfo.postalCode}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>국가:</label>
        <input
          type="text"
          name="country"
          value={shippingInfo.country}
          onChange={handleShippingChange}
          style={styles.input}
          required
        />
        <label>배송 방법:</label>
        <select
          name="shippingMethod"
          value={shippingInfo.shippingMethod}
          onChange={handleShippingChange}
          style={styles.select}
        >
          <option value="Standard">일반 배송</option>
          <option value="Fast">빠른 배송</option>
        </select>
      </section>

      {/* 결제 버튼 */}
      <section style={styles.section}>
        <button onClick={handlePlaceOrder} style={styles.button}>
          결제
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: "30px",
  },
  sectionTitle: {
    fontSize: "1.5em",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2em",
    width: "100%",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  discountSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  discountInput: {
    width: "80%",
    padding: "10px",
    marginRight: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  discountButton: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    color: "#d9534f",
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    padding: "10px 0",
  },
  summary: {
    fontWeight: "bold",
  },
};

export default Order;
