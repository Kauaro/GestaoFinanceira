import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import "./Login.css";
import { api } from "../../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
      <div className="login-container">
        <div className="login-background-effects">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
        </div>

        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <div className="logo-icon"><img src="/logo.png" id="logo" /></div>
            </div>
            <h1>Bem-vindo de volta</h1>
            <p>Acesse sua conta para continuar gerenciando suas finanças</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className={`form-group ${emailFocused || email ? "active" : ""}`}>
              <label htmlFor="email">E-mail</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                />
              </div>
            </div>

            <div className={`form-group ${passwordFocused || password ? "active" : ""}`}>
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper password-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar ou ocultar senha"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Lembrar-me</span>
              </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            {error && <div className="form-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>}

            <button className="login-button" type="submit" disabled={loading}>
              <span className="button-content">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </span>
            </button>
          </form>

          <div className="divider">
            <span>Novo por aqui?</span>
          </div>

          <Link to="/registro" className="signup-link">
            Criar minha conta
          </Link>

          <p className="footer-text">
            Seus dados estão protegidos com encriptação de ponta a ponta
          </p>
        </div>
      </div>
    </>
  );
}
