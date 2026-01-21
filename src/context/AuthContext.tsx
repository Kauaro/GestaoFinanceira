import { createContext, useState, useEffect, type ReactNode } from "react";
import { login as loginApi } from "../services/auth";
import { api } from "../services/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  autenticado: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const autenticado = !!usuario;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (token && usuarioSalvo) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  async function login(email: string, senha: string) {
    const resposta = await loginApi({ email, senha });

    const { token, usuario } = resposta;

    // Salva no navegador
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Define token automático no axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUsuario(usuario);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        autenticado,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
