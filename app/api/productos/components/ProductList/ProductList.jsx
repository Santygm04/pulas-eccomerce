"use client"

import { useEffect, useState } from "react"
import ProductCard from "../ProductCard/ProductCard"
import { useProductos } from "../../context/ProductContext"
import "./ProductList.css"

export default function ProductList({ filtroCategoria, subCategoria }) {
  const { productos, loading } = useProductos()
  const [filtrados, setFiltrados] = useState([])

  useEffect(() => {
    const normalizar = (str) => (str || "").toString().trim().toLowerCase()

    const resultados = productos.filter((p) => {
      const catOk = filtroCategoria ? normalizar(p.categoria) === normalizar(filtroCategoria) : true

      const subOk = subCategoria ? normalizar(p.subCategoria || p.subcategoria) === normalizar(subCategoria) : true

      const tieneStock = Object.values(p.stock || {}).some((colores) =>
        Object.values(colores).some((cantidad) => cantidad > 0),
      )

      return catOk && subOk && tieneStock
    })

    setFiltrados(resultados)
  }, [productos, filtroCategoria, subCategoria])

  if (loading) {
    return <div className="product-list">Cargando productos...</div>
  }

  if (filtrados.length === 0) {
    return <p className="empty-text">No hay productos disponibles.</p>
  }

  return (
    <div className="product-list">
      {filtrados.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  )
}
