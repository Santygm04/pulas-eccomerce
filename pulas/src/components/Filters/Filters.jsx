"use client"

import { useState, useEffect } from "react"
import { useProductos } from "../../context/ProductContext"
import "./Filters.css"

export default function Filters({ onFiltersChange, currentCategory = null, isOpen, onToggle }) {
  const { productos } = useProductos()

  const [filters, setFilters] = useState({
    categoria: currentCategory || "",
    subCategoria: "",
    precioMin: "",
    precioMax: "",
    colores: [],
    talles: [],
    soloEnStock: true,
  })

  const [availableOptions, setAvailableOptions] = useState({
    subcategorias: [],
    colores: [],
    talles: [],
    precioRange: { min: 0, max: 100000 },
  })

  // Actualizar opciones disponibles cuando cambien los productos
  useEffect(() => {
    if (productos.length > 0) {
      const subcategorias = [...new Set(productos.map((p) => p.subCategoria).filter(Boolean))]
      const colores = [
        ...new Set(productos.flatMap((p) => Object.values(p.stock || {}).flatMap((talle) => Object.keys(talle)))),
      ]
      const talles = [...new Set(productos.flatMap((p) => Object.keys(p.stock || {})))]
      const precios = productos.map((p) => p.precio).filter((p) => p > 0)

      setAvailableOptions({
        subcategorias: subcategorias.sort(),
        colores: colores.sort(),
        talles: talles.sort((a, b) => {
          const order = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
          return order.indexOf(a) - order.indexOf(b)
        }),
        precioRange: {
          min: Math.min(...precios),
          max: Math.max(...precios),
        },
      })
    }
  }, [productos])

  // Aplicar filtros cuando cambien
  useEffect(() => {
    const filteredProducts = productos.filter((producto) => {
      if (filters.categoria && producto.categoria !== filters.categoria) return false
      if (filters.subCategoria && producto.subCategoria !== filters.subCategoria) return false
      if (filters.precioMin && producto.precio < Number(filters.precioMin)) return false
      if (filters.precioMax && producto.precio > Number(filters.precioMax)) return false

      if (filters.colores.length > 0) {
        const productColors = Object.values(producto.stock || {}).flatMap((talle) => Object.keys(talle))
        const hasColor = filters.colores.some((color) => productColors.includes(color))
        if (!hasColor) return false
      }

      if (filters.talles.length > 0) {
        const productSizes = Object.keys(producto.stock || {})
        const hasSize = filters.talles.some((talle) => productSizes.includes(talle))
        if (!hasSize) return false
      }

      if (filters.soloEnStock) {
        const hasStock = Object.values(producto.stock || {}).some((colores) =>
          Object.values(colores).some((cantidad) => cantidad > 0),
        )
        if (!hasStock) return false
      }

      return true
    })

    onFiltersChange(filteredProducts)
  }, [filters, productos, onFiltersChange])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleArrayFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      categoria: currentCategory || "",
      subCategoria: "",
      precioMin: "",
      precioMax: "",
      colores: [],
      talles: [],
      soloEnStock: true,
    })
  }

  const hasActiveFilters =
    filters.subCategoria ||
    filters.precioMin ||
    filters.precioMax ||
    filters.colores.length > 0 ||
    filters.talles.length > 0 ||
    !filters.soloEnStock

  const filteredCount = productos.filter((producto) => {
    if (filters.categoria && producto.categoria !== filters.categoria) return false
    if (filters.subCategoria && producto.subCategoria !== filters.subCategoria) return false
    if (filters.precioMin && producto.precio < Number(filters.precioMin)) return false
    if (filters.precioMax && producto.precio > Number(filters.precioMax)) return false

    if (filters.colores.length > 0) {
      const productColors = Object.values(producto.stock || {}).flatMap((talle) => Object.keys(talle))
      const hasColor = filters.colores.some((color) => productColors.includes(color))
      if (!hasColor) return false
    }

    if (filters.talles.length > 0) {
      const productSizes = Object.keys(producto.stock || {})
      const hasSize = filters.talles.some((talle) => productSizes.includes(talle))
      if (!hasSize) return false
    }

    if (filters.soloEnStock) {
      const hasStock = Object.values(producto.stock || {}).some((colores) =>
        Object.values(colores).some((cantidad) => cantidad > 0),
      )
      if (!hasStock) return false
    }

    return true
  }).length

  return (
    <>
      {/* Overlay */}
      <div className={`filters-overlay ${isOpen ? "open" : ""}`} onClick={onToggle} />

      {/* Sidebar */}
      <div className={`filters-sidebar ${isOpen ? "open" : ""}`}>
        <div className="filters-header">
          <h3 className="filters-title">🔍 Filtros</h3>
          <button onClick={onToggle} className="close-filters-btn">
            ✕
          </button>
        </div>

        <div className="filters-content">
          <button onClick={clearAllFilters} className="clear-filters-btn" disabled={!hasActiveFilters}>
            🗑️ Limpiar Filtros
          </button>

          {/* Filtro por Subcategoría */}
          <div className="filter-group">
            <label className="filter-label">🏷️ Tipo de Producto</label>
            <select
              className="filter-select"
              value={filters.subCategoria}
              onChange={(e) => handleFilterChange("subCategoria", e.target.value)}
            >
              <option value="">Todos los tipos</option>
              {availableOptions.subcategorias.map((sub) => (
                <option key={sub} value={sub}>
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Precio */}
          <div className="filter-group">
            <label className="filter-label">💰 Rango de Precio</label>
            <div className="price-range-container">
              <input
                type="number"
                className="price-input"
                placeholder={`Desde $${availableOptions.precioRange.min}`}
                value={filters.precioMin}
                onChange={(e) => handleFilterChange("precioMin", e.target.value)}
              />
              <input
                type="number"
                className="price-input"
                placeholder={`Hasta $${availableOptions.precioRange.max}`}
                value={filters.precioMax}
                onChange={(e) => handleFilterChange("precioMax", e.target.value)}
              />
            </div>
          </div>

          {/* Filtro por Stock */}
          <div className="filter-group">
            <label className="filter-label">📦 Disponibilidad</label>
            <div className="checkbox-group">
              <div
                className={`checkbox-item ${filters.soloEnStock ? "selected" : ""}`}
                onClick={() => handleFilterChange("soloEnStock", !filters.soloEnStock)}
              >
                <input
                  type="checkbox"
                  checked={filters.soloEnStock}
                  onChange={() => handleFilterChange("soloEnStock", !filters.soloEnStock)}
                />
                <span className="checkbox-label">Solo en stock</span>
              </div>
            </div>
          </div>

          {/* Filtros de Color */}
          {availableOptions.colores.length > 0 && (
            <div className="filter-group">
              <label className="filter-label">🎨 Colores</label>
              <div className="color-options">
                {availableOptions.colores.map((color) => (
                  <div
                    key={color}
                    className={`color-option ${filters.colores.includes(color) ? "selected" : ""}`}
                    onClick={() => handleArrayFilterChange("colores", color)}
                  >
                    <div className={`color-circle ${color}`}></div>
                    <span className="checkbox-label">{color.charAt(0).toUpperCase() + color.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filtros de Talle */}
          {availableOptions.talles.length > 0 && (
            <div className="filter-group">
              <label className="filter-label">📏 Talles</label>
              <div className="size-options">
                {availableOptions.talles.map((talle) => (
                  <div
                    key={talle}
                    className={`size-option ${filters.talles.includes(talle) ? "selected" : ""}`}
                    onClick={() => handleArrayFilterChange("talles", talle)}
                  >
                    {talle}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resumen de Filtros */}
          <div className="filters-summary">
            <div className={`summary-text ${filteredCount === 0 ? "no-results" : ""}`}>
              {filteredCount === 0
                ? "❌ Sin resultados"
                : `✅ ${filteredCount} producto${filteredCount !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
