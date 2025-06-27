import "./css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!id || !pw || !pwCheck) {
      setErrorMessage("모든 항목을 입력해주세요");
      return;
    }

    if (pw !== pwCheck) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: id, password: pw }),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        alert(result.error || "회원가입 실패");
      }
    } catch (err) {
      console.error("회원가입 에러:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="app-name dm-serif-display-regular">PlanIt</h1>
      <div className="signup-content">
        <h2 className="signup dm-serif-display-regular">Signup</h2>
        <div className="input-content">
          <input
            className="id-input"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="password-input"
            placeholder="비밀번호"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <input
            className="re-password-input"
            placeholder="비밀번호 확인"
            type="password"
            value={pwCheck}
            onChange={(e) => setPwCheck(e.target.value)}
          />
          <p
            className="error-message"
            style={{ display: errorMessage === "" ? "none" : "flex" }}
          >
            {errorMessage}
          </p>
        </div>
        <div className="choice-content">
          <button onClick={handleSignup} className="signup-button">
            <p>회원가입</p>
          </button>
          <Link to="/" className="back-button">
            <p>돌아가기</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
