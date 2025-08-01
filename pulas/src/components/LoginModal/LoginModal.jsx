"use client"

import { useState } from "react"
import { useUser } from "../../context/UserContext"
import "./LoginModal.css"

export default function LoginModal({ isOpen, onClose }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useUser()

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
    setError("") // Limpiar error al escribir
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular delay de autenticación
    setTimeout(() => {
      const result = login(credentials.username, credentials.password)

      if (result.success) {
        onClose()
        setCredentials({ username: "", password: "" })
        alert("¡Bienvenida Maria! 👋")
      } else {
        setError(result.error)
      }
      setIsLoading(false)
    }, 800)
  }

  const handleClose = () => {
    setCredentials({ username: "", password: "" })
    setError("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="login-overlay" onClick={handleClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-header">
          <h2 className="login-title">🔐 Acceso Admin</h2>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        </div>

        {error && <div className="error-message">❌ {error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">👤 Usuario</label>
            <input
              type="text"
              name="username"
              className="form-input"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Ingresa tu usuario"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">🔑 Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Ingresa tu contraseña"
              required
              autoComplete="current-password"
            />
          </div>

          <div className="login-buttons">
            <button type="button" className="login-btn secondary" onClick={handleClose} disabled={isLoading}>
              Cancelar
            </button>
            <button type="submit" className="login-btn primary" disabled={isLoading}>
              {isLoading ? "🔄 Verificando..." : "🚀 Ingresar"}
            </button>
          </div>
        </form>

        <div className="secret-hint">💡 Pista: usuario "admin" / contraseña "pulas2025"</div>
      </div>
    </div>
  )
}
