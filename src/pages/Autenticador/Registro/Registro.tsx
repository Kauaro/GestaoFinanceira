import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../services/api";

import "./Registro.css";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await api.post("/autenticar/cadastro", {
        nome: name,
        email: email,
        senha: password,
      });

      setSuccess("Conta criada com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      
      setTimeout(() => {
      navigate("/");
      }, 1500);


    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Erro ao criar conta. Tente novamente."
      );
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
            <h1>Crie sua conta</h1>
            <p>Cadastre-se agora e comece a gerir suas finanças inteligentemente</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className={`form-group ${nameFocused || name ? "active" : ""}`}>
              <label htmlFor="name">Nome Completo</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div className={`form-group ${emailFocused || email ? "active" : ""}`}>
              <label htmlFor="email">E-mail</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className={`form-group ${passwordFocused || password ? "active" : ""}`}>
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper password-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="••••••••"
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
              <span className="password-hint">Mínimo 6 caracteres</span>
            </div>

            <div className={`form-group ${confirmFocused || confirmPassword ? "active" : ""}`}>
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="input-wrapper password-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setConfirmFocused(true)}
                  onBlur={() => setConfirmFocused(false)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Mostrar ou ocultar confirmação"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="form-error">
              <span className="error-icon">⚠️</span>
              {error}
            </div>}
            {success && <div className="form-success">
              <span className="success-icon">✓</span>
              {success}
            </div>}

            <button
              className="login-button"
              type="submit"
              disabled={
                !name ||
                !email ||
                !password ||
                !confirmPassword 
                
              }
            >
              <span className="button-content">
                Criar minha conta
              </span>
            </button>
          </form>

          <div className="divider">
            <span>Já possui uma conta?</span>
          </div>

          <Link to="/" className="signup-link">
            Fazer login
          </Link>

          <p className="footer-text">
            Sua segurança é nossa prioridade - encriptação de ponta a ponta
          </p>
        </div>
      </div>
    </>
  );
}
