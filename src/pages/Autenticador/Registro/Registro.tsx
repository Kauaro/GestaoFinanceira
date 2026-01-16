import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";


import NavBar from "../../../components/Navbar/Navbar";
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
      await api.post("/usuarios", {
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
      <NavBar />

      <div className="login-container">
        <div className="login-card">
          <h1>Crie sua conta</h1>
          <p>Cadastre-se para começar a gerir sua renda</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Informe seu nome..."
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email..."
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirmação de senha</label>
              <div className="password-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <button
              className="login-button"
              type="submit"
              disabled={
                !name ||
                !email ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
            >
              Criar conta
            </button>
          </form>

          <span className="signup-text">
            Já tem conta? <Link to="/">Entrar</Link>
          </span>
        </div>
      </div>
    </>
  );
}
