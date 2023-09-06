import { useUserContext } from "../context/UserContext";

export default function useSignup() {
  const { setUser } = useUserContext();

  const signup = async (name, email, password) => {
    try {
      const res = await fetch(`http://localhost:4000/api/user/signup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      localStorage.setItem("chat-user", JSON.stringify(json));
      setUser(json);
    } catch (error) {
      console.log(error);
    }
  };

  return signup;
}
