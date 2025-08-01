"use client"

import { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Credenciales de admin (puedes cambiarlas)
  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "pulas2025", // 👈 Cambia esta contraseña
  }

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem("pulasUser")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem("pulasUser")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const userData = {
        nombre: "Maria",
        email: "admin@pulas.com",
        isAdmin: true,
        loginTime: new Date().toISOString(),
      }
      setUser(userData)
      localStorage.setItem("pulasUser", JSON.stringify(userData))
      return { success: true }
    } else {
      return { success: false, error: "Credenciales incorrectas" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pulasUser")
  }

  return <UserContext.Provider value={{ user, login, logout, isLoading }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
