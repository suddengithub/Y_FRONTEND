import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>구매가 정상적으로 완료되었습니다.</h1>
      <p>구매해주셔서 감사드립니다.</p>
      <button onClick={() => navigate("/")}>메인페이지로 돌아가기</button>
      <button onClick={() => navigate("/own-pc")}>
        커스텀PC 페이지로 돌아가기
      </button>
      <button onClick={() => navigate("/suggested-pc")}>
        추천PC 페이지로 돌아가기
      </button>
    </div>
  );
};

export default OrderSuccess;
