import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 카드 유형을 인식하는 함수
const getCardType = (cardNumber) => {
  const amexRegex = /^(34|37)/;
  const shinhanRegex = /^3/;
  const visaRegex = /^4/;
  const masterCardRegex = /^5/;

  if (amexRegex.test(cardNumber)) {
    return "American Express";
  } else if (shinhanRegex.test(cardNumber)) {
    return "Shinhan";
  } else if (visaRegex.test(cardNumber)) {
    return "VISA";
  } else if (masterCardRegex.test(cardNumber)) {
    return "MasterCard";
  } else {
    return null;
  }
};

const Order = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState({
    items: [
      { name: "A", quantity: 1, price: 100, options: "a" },
      { name: "A", quantity: 2, price: 200, options: "a" },
    ],
    shippingCost: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    CVC: "",
    password: "",
    paymentMethod: "신용카드",
  });

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [message, setMessage] = useState("");
  const [cardType, setCardType] = useState(null);

  // 주문 정보 계산
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

  useEffect(() => {
    calculateTotal();
  }, [
    orderSummary.items,
    orderSummary.shippingCost,
    orderSummary.tax,
    orderSummary.discount,
  ]);

  // 카드 번호 변경 처리
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 16) {
      const formatted = value.replace(/(\d{4})(?=\d)/g, "$1-").trim();
      setPaymentInfo((prevState) => ({
        ...prevState,
        cardNumber: formatted,
      }));
    }

    const type = getCardType(value);
    setCardType(type);
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
    if (
      paymentInfo.paymentMethod === "신용카드" &&
      (!paymentInfo.cardNumber ||
        !paymentInfo.expiryMonth ||
        !paymentInfo.expiryYear ||
        !paymentInfo.CVC)
    ) {
      setMessage("결제 정보를 모두 입력해주세요.");
      return;
    }

    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.address) {
      setMessage("배송 정보를 모두 입력해주세요.");
      return;
    }

    setMessage("결제 중입니다...");

    // 주문 정보 및 결제 정보를 state로 전달
    navigate("/order-success", {
      state: {
        orderSummary,
        paymentInfo,
        shippingInfo,
      },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>주문 페이지</h1>

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
        <label>우편번호:</label>
        <input
          type="text"
          name="postalCode"
          value={shippingInfo.postalCode}
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
      </section>

      {/* 주문 정보 (Order Summary) */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 정보</h2>
        <ul style={styles.list}>
          {orderSummary.items.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <p>제품명: {item.name}</p>
              <p>수량: {item.quantity}</p>
              <p>가격: ₩{item.price}</p>
              <p>옵션: {item.options}</p>
            </li>
          ))}
        </ul>
        <p style={styles.summary}>
          소계: ₩
          {orderSummary.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          )}
        </p>
        <p>배송비: ₩{orderSummary.shippingCost}</p>
        <p>총액: ₩{orderSummary.total}</p>
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
          <option value="신용카드">신용카드</option>
          <option value="TOSS">TOSS</option>
        </select>

        {paymentInfo.paymentMethod === "신용카드" && (
          <div>
            <label>카드 번호:</label>
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              style={styles.input}
              maxLength={19}
              placeholder="카드 번호를 입력하세요"
              required
            />
            {cardType && (
              <div style={styles.cardTypeBox}>
                <strong>카드 타입 : &nbsp; &nbsp;</strong>
                <span>{cardType}</span>
                <img
                  src={`/images/${cardType.toLowerCase()}.png`} // 예: "visa.png", "mastercard.png"
                  alt={cardType}
                  style={{
                    width: "50px",
                    height: "auto",
                    marginLeft: "10px",
                  }}
                />
              </div>
            )}

            <label>유효 기간:</label>
            <div style={styles.expiryBox}>
              <input
                type="text"
                name="expiryMonth"
                value={paymentInfo.expiryMonth}
                onChange={handlePaymentChange}
                style={{ ...styles.input, width: "48%" }}
                placeholder="MM"
                maxLength={2}
                required
              />
              <div style={styles.slash}>/</div>
              <input
                type="text"
                name="expiryYear"
                value={paymentInfo.expiryYear}
                onChange={handlePaymentChange}
                style={{ ...styles.input, width: "48%" }}
                placeholder="YY"
                maxLength={2}
                required
              />
            </div>

            <label>CVC:</label>
            <input
              type="text"
              name="CVC"
              value={paymentInfo.CVC}
              onChange={handlePaymentChange}
              style={styles.input}
              maxLength={3}
              placeholder="CVC를 입력하세요"
              required
            />

            <label>비밀번호:</label>
            <div style={styles.passwordBox}>
              <input
                type="password"
                name="password"
                value={paymentInfo.password}
                onChange={handlePaymentChange}
                style={{ ...styles.input, width: "48%" }}
                maxLength={2}
                placeholder="비밀번호를 입력하세요"
                required
              />
              <span style={styles.maskBox}> ** </span>
            </div>
          </div>
        )}
      </section>

      {/* 결제 버튼 */}
      <section style={styles.section}>
        <button onClick={handlePlaceOrder} style={styles.button}>
          결제하기
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
    width: "97%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  expiryBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slash: {
    fontSize: "1.5em",
    padding: "0 10px",
  },
  passwordBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  maskBox: {
    padding: "10px",
    borderRadius: "5px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    borderBottom: "1px solid #eee",
    padding: "10px 0",
  },
  summary: {
    fontSize: "1.2em",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  cardTypeBox: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#f4f4f4",
    color: "black",
    border: "1px solid #ddd",

    padding: "15px 30px",

    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2em",
    width: "100%",
  },
  message: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
};

export default Order;
