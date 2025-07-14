import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id || !pw) {
      setErrorMessage("아이디와 비밀번호를 모두 입력해주세요");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, password: pw }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", id);
        navigate("/plan-it");
      } else {
        alert(result.error || "로그인 실패");
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="app-name dm-serif-display-regular">PlanIt</h1>
      <div className="login-content">
        <h2 className="login dm-serif-display-regular">Login</h2>
        <div className="input-content">
          <input
            className="id-input"
            placeholder="아이디"
            value={id}
            onFocus={() => setErrorMessage("")}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="password-input"
            placeholder="비밀번호"
            type="password"
            value={pw}
            onFocus={() => setErrorMessage("")}
            onChange={(e) => setPw(e.target.value)}
          />
          <p
            className="error-message"
            style={{ display: errorMessage === "" ? "none" : "flex" }}
          >
            {errorMessage}
          </p>
        </div>
        <div className="choice-content">
          <button onClick={handleLogin} className="login-button">
            <p>로그인</p>
          </button>
          <Link to="/signup" className="signup-button">
            <p>회원가입</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
