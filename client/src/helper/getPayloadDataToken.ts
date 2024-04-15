import { jwtDecode } from "jwt-decode";

export default function getPayloadDataToken(): any {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return jwtDecode(token);
}
