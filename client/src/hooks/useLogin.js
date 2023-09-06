import { useUserContext } from "../context/UserContext";

export default function useLogin() {
  const { setUser } = useUserContext();

  const login = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) return;
      localStorage.setItem("chat-user", JSON.stringify(json));
      setUser(json);
    } catch (error) {
      console.log(error);
    }
  };

  return login;
}
