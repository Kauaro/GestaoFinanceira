import { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { autenticado } = useContext(AuthContext);

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
    