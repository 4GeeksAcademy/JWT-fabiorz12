login: async (email, password) => {
  try {
    const resp = await fetch(process.env.BACKEND_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (resp.ok) {
      const data = await resp.json();
      sessionStorage.setItem("token", data.access_token);
      return true;
    } else {
      console.log("Error al iniciar sesión");
      return false;
    }
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
}