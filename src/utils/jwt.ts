interface JwtPayload {
  sub: string;
  name: string;
  id: string;
  exp: number;
}

export function getUsuarioId(): number | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = token.split(".")[1];
  const decoded = JSON.parse(atob(payload)) as JwtPayload;

  return Number(decoded.id);
}
