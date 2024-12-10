import React from "react";
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  // useLocation 훅을 사용하여 이전 페이지에서 전달된 state 데이터 가져오기
  const location = useLocation();
  const { orderSummary, paymentInfo, shippingInfo } = location.state || {};

  // 카드 번호 중간 8자리를 마스킹하는 함수
  const maskCardNumber = (cardNumber) => {
    return cardNumber.replace(/\d(?=\d{4})/g, "*");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>주문 완료</h1>

      {/* 주문 정보 섹션 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>주문 정보</h2>
        <p>주문 번호: {orderSummary?.orderId}</p>
        <p>총액: ₩{orderSummary?.total}</p>
      </section>

      {/* 결제 정보 섹션 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>결제 정보</h2>
        <p>결제 수단: {paymentInfo?.paymentMethod}</p>
        {paymentInfo?.paymentMethod === "신용카드" && (
          <p>카드 번호: {maskCardNumber(paymentInfo.cardNumber)}</p>
        )}
        {paymentInfo?.paymentMethod === "TOSS" && <p>TOSS 결제 완료</p>}
      </section>

      {/* 배송 정보 섹션 */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>배송 정보</h2>
        <p>이름: {shippingInfo?.name}</p>
        <p>연락처: {shippingInfo?.phone}</p>
        <p>주소: {shippingInfo?.address}</p>
      </section>
    </div>
  );
};

// 스타일 객체
const styles = {
  container: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1.5em",
    color: "#333",
    marginBottom: "10px",
  },
};

export default OrderSuccess;
