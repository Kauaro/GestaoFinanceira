import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";
import NavBar from "../../../components/Navbar/Navbar";
import { api } from "../../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/autenticar/login", {
        email: email,
        senha: password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/dashboard");

      
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Email ou senha inválidos"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <NavBar />

      <div className="login-container">
        <div className="login-card">
          <h1>Bem-vindo de volta</h1>
          <p>Acesse sua conta para continuar</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar ou ocultar senha"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Lembrar-me
              </label>
              <a href="#">Esqueceu a senha?</a>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <span className="signup-text">
            Não tem conta? <Link to="/registro">Criar conta</Link>
          </span>
        </div>
      </div>
    </>
  );
}
