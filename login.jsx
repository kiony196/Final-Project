import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("Response:", data); // 👈 DEBUG

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login successful ✅");

        // redireciona
        navigate("/");
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🍰 Welcome Back</h2>
        <p>Login to your account</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
