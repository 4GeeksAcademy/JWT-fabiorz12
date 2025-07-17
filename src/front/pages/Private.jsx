import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Private = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch(process.env.BACKEND_URL + "/api/private", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) throw new Error("No autorizado");
        return res.json();
      })
      .then((data) => setMessage(data.msg))
      .catch(() => navigate("/login"));
  }, []);

  return <h2>{message || "Cargando..."}</h2>;
};

export default Private;