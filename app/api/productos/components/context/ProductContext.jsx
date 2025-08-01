"use client"

import { createContext, useContext, useState, useEffect } from "react"

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  // Cargar productos al inicializar
  useEffect(() => {
    fetchProductos()
  }, [])

  const fetchProductos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/productos")
      if (response.ok) {
        const data = await response.json()
        setProductos(data)
      } else {
        console.error("Error al cargar productos")
      }
    } catch (error) {
      console.error("Error al cargar productos:", error)
    } finally {
      setLoading(false)
    }
  }

  const agregarProducto = async (nuevoProducto) => {
    try {
      const response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      })

      if (response.ok) {
        const productoCreado = await response.json()
        setProductos((prev) => [...prev, productoCreado])
      } else {
        throw new Error("Error al crear producto")
      }
    } catch (error) {
      console.error("Error al agregar producto:", error)
      throw error
    }
  }

  const actualizarProducto = async (productoActualizado) => {
    try {
      const response = await fetch("/api/productos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
      })

      if (response.ok) {
        const productoActualizadoResponse = await response.json()
        setProductos((prev) =>
          prev.map((p) => (p.id === productoActualizadoResponse.id ? productoActualizadoResponse : p)),
        )
      } else {
        throw new Error("Error al actualizar producto")
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error)
      throw error
    }
  }

  const updateStock = async (productId, talle, color, cantidad) => {
    try {
      const response = await fetch(`/api/productos/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ talle, color, cantidad }),
      })

      if (response.ok) {
        const productoActualizado = await response.json()
        setProductos((prev) => prev.map((p) => (p.id === productId ? productoActualizado : p)))
      } else {
        throw new Error("Error al actualizar stock")
      }
    } catch (error) {
      console.error("Error al actualizar stock:", error)
      throw error
    }
  }

  const eliminarProducto = async (id) => {
    try {
      const response = await fetch(`/api/productos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setProductos((prev) => prev.filter((p) => p.id !== id))
      } else {
        throw new Error("Error al eliminar producto")
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error)
      throw error
    }
  }

  const refetchProductos = async () => {
    await fetchProductos()
  }

  return (
    <ProductContext.Provider
      value={{
        productos,
        loading,
        agregarProducto,
        actualizarProducto,
        updateStock,
        eliminarProducto,
        refetchProductos,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductos() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductos must be used within a ProductProvider")
  }
  return context
}
