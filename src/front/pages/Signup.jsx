import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/private");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.BACKEND_URL + "/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 201) navigate("/login");
    else alert("Error en el registro");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Signup;