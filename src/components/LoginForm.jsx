function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  handleRegister,
}) {
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          color: "white",
          boxShadow: "0 0 20px rgba(0,0,0,.3)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>🏦 XBank</h1>

        <p style={{ textAlign: "center", color: "#cbd5e1" }}>
          Mi Banco Digital
        </p>

        <label htmlFor="email">Correo electrónico</label>

        <input
          id="email"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        <label htmlFor="password" style={{ marginTop: "15px", display: "block" }}>
          Contraseña
        </label>

        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "8px",
            border: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Iniciar sesión
        </button>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "12px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default LoginForm;