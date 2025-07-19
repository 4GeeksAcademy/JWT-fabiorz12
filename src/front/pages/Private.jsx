import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(process.env.BACKEND_URL + "/private", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("No autorizado");
      })
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  }, []);

  return (
    <div className="container">
      <h2>Zona Privada</h2>
      <p>{message}</p>
    </div>
  );
};

export default Private;