import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

const Login = () => {
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        navigate("/private");
    }
}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await store.actions.login(email, password);
    if (success) {
      navigate("/private");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control my-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;