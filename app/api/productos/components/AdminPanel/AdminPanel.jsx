"use client"

import { useState } from "react"
import { useUser } from "../../context/UserContext"
import { Navigate } from "react-router-dom"
import StockManager from "../../components/StockManager/StockManager"
import CargarProducto from "../../components/CargarProducto/CargarProducto"
import { useProductos } from "../../context/ProductContext"
import "./AdminPanel.css"

export default function AdminPanel() {
  const { user } = useUser()
  const [vista, setVista] = useState("stock")
  const { productos, agregarProducto, loading } = useProductos()

  const handleNuevoProducto = async (nuevo) => {
    try {
      await agregarProducto(nuevo)
      setVista("stock")
      alert("✅ Producto agregado correctamente")
    } catch (error) {
      alert("❌ Error al agregar producto")
      console.error(error)
    }
  }

  if (!user?.isAdmin) return <Navigate to="/" />

  if (loading) {
    return (
      <div className="admin-panel">
        <h2 className="admin-title">Cargando...</h2>
      </div>
    )
  }

  return (
    <div className="admin-panel">
      <h2 className="admin-title">Panel de Administración</h2>
      <div className="admin-tabs">
        <button onClick={() => setVista("stock")}>📦 Stock</button>
        <button onClick={() => setVista("subir")}>➕ Subir Producto</button>
        <button onClick={() => setVista("reportes")}>📊 Reportes</button>
      </div>

      {vista === "stock" && (
        <section className="admin-section">
          <h3>📦 Control de Stock</h3>
          <StockManager productos={productos} />
        </section>
      )}

      {vista === "subir" && (
        <section className="admin-section">
          <h3>➕ Subir Nuevo Producto</h3>
          <CargarProducto onProductoSubido={handleNuevoProducto} />
        </section>
      )}

      {vista === "reportes" && (
        <section className="admin-section">
          <h3>📊 Reportes de Ventas</h3>
          <p>(Sección en construcción)</p>
        </section>
      )}
    </div>
  )
}
