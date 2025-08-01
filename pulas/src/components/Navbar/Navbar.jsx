"use client"

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useUser } from "../../context/UserContext"
import "./Navbar.css"

// Modal de Login integrado
function LoginModal({ isOpen, onClose }) {
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
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      const result = login(credentials.username, credentials.password)

      if (result.success) {
        onClose()
        setCredentials({ username: "", password: "" })
        alert("¡Bienvenida Maria! 👋") // 👈 Cambiar de "Sofi" a "Maria"
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
          <p className="login-subtitle">Ingresa tus credenciales</p>
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
              placeholder="admin"
              required
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
              placeholder="pulas2025"
              required
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
      </div>
    </div>
  )
}

function Navbar() {
  const { carrito } = useCart()
  const { user, logout } = useUser()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.altKey && e.key === "a") {
        e.preventDefault()
        if (!user?.isAdmin) {
          setShowLoginModal(true)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [user])

  const handleLogout = () => {
    const confirm = window.confirm("¿Seguro que querés cerrar sesión?")
    if (confirm) {
      logout()
      alert("👋 Sesión cerrada correctamente")
    }
  }

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">PULAS</h2>
        <ul className="nav-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/hombre">Hombre</Link>
          </li>
          <li>
            <Link to="/mujer">Mujer</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/carrito" className="carrito-link">
              🛒{cantidadTotal > 0 && <span className="cart-count">{cantidadTotal}</span>}
            </Link>
          </li>

          {/* 🎨 ÁREA DE ADMIN INTEGRADA */}
          {user?.isAdmin && (
            <li className="admin-section">
              <span className="user-indicator">👋 Hola {user.nombre}</span>
              <Link to="/admin" className="admin-link">
                👑 Admin Panel
              </Link>
              <button onClick={handleLogout} className="logout-btn" title="Cerrar sesión">
                🚪
              </button>
            </li>
          )}

          {/* 🔐 BOTÓN DE LOGIN SECRETO */}
          {!user?.isAdmin && (
            <li>
              <button
                onClick={() => setShowLoginModal(true)}
                className="secret-login-btn"
                title="Acceso Admin (Ctrl+Alt+A)"
              >
                🔐
              </button>
            </li>
          )}
        </ul>
      </nav>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  )
}

export default Navbar
