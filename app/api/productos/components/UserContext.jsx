"use client"

import { createContext, useContext } from "react"

const UserContext = createContext()

export function UserProvider({ children }) {
  const user = {
    nombre: "Sofi",
    email: "admin@pulas.com",
    isAdmin: true,
  }

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
