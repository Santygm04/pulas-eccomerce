"use client"

import { createContext, useState, useContext } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto, talle, color) => {
    const itemId = `${producto.id}-${talle}-${color}`
    const existe = carrito.find((item) => item.id === itemId)

    if (existe) {
      setCarrito(carrito.map((item) => (item.id === itemId ? { ...item, cantidad: item.cantidad + 1 } : item)))
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          id: itemId,
          cantidad: 1,
          talle,
          color,
        },
      ])
    }
  }

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
