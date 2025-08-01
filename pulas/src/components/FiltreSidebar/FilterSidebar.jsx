"use client"

import { useState, useEffect, useCallback } from "react"
import { useProductos } from "../../context/ProductContext"
import "./FilterSidebar.css"

export default function FilterSidebar({ isOpen, onToggle, onFiltersChange, currentCategory = null }) {
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

  // 🔄 Resetear filtros cuando cambia la categoría
  useEffect(() => {
    setFilters({
      categoria: currentCategory || "",
      subCategoria: "",
      precioMin: "",
      precioMax: "",
      colores: [],
      talles: [],
      soloEnStock: true,
    })
  }, [currentCategory])

  // Todas las subcategorías disponibles
  const allSubcategorias = ["remeras", "pantalones", "remerasTermicas", "pantalonescargo", "camperas", "buzos", "tops"]

  // Actualizar opciones disponibles cuando cambien los productos
  useEffect(() => {
    if (productos.length > 0) {
      const colores = [
        ...new Set(productos.flatMap((p) => Object.values(p.stock || {}).flatMap((talle) => Object.keys(talle)))),
      ]
      const talles = [...new Set(productos.flatMap((p) => Object.keys(p.stock || {})))]
      const precios = productos.map((p) => p.precio).filter((p) => p > 0)

      setAvailableOptions({
        subcategorias: allSubcategorias,
        colores: colores.sort(),
        talles: talles.sort((a, b) => {
          const order = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
          return order.indexOf(a) - order.indexOf(b)
        }),
        precioRange: {
          min: precios.length > 0 ? Math.min(...precios) : 0,
          max: precios.length > 0 ? Math.max(...precios) : 100000,
        },
      })
    }
  }, [productos])

  // 🔧 Función memoizada para aplicar filtros
  const applyFilters = useCallback(() => {
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

    const hasActiveFilters =
      filters.subCategoria ||
      filters.precioMin ||
      filters.precioMax ||
      filters.colores.length > 0 ||
      filters.talles.length > 0 ||
      !filters.soloEnStock

    return { filteredProducts, hasActiveFilters }
  }, [productos, filters])

  // 🔧 Aplicar filtros solo cuando cambien los filtros o productos
  useEffect(() => {
    const { filteredProducts, hasActiveFilters } = applyFilters()
    onFiltersChange(filteredProducts, hasActiveFilters)
  }, [applyFilters, onFiltersChange])

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

  const getSubcategoryLabel = (sub) => {
    const labels = {
      remeras: "👕 Remeras",
      pantalones: "👖 Pantalones",
      remerasTermicas: "🧥 Remeras Térmicas",
      pantalonescargo: "👖 Pantalones/Jogger/Cargo",
      camperas: "🧥 Camperas",
      buzos: "👘 Buzos",
      tops: "👚 Tops",
    }
    return labels[sub] || sub
  }

  return (
    <>
      {/* Overlay */}
      <div className={`filter-overlay ${isOpen ? "open" : ""}`} onClick={onToggle} />

      {/* Sidebar */}
      <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
        <div className="filter-header">
          <h3 className="filter-title">🔍 Filtros Avanzados</h3>
          <button onClick={onToggle} className="close-filter-btn">
            ✕
          </button>
        </div>

        <div className="filter-content">
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
                  {getSubcategoryLabel(sub)}
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
          <div className="filter-summary">
            <div className={`summary-text ${filteredCount === 0 ? "no-results" : ""}`}>
              {filteredCount === 0
                ? "❌ Sin resultados"
                : `✅ ${filteredCount} producto${filteredCount !== 1 ? "s" : ""} encontrado${filteredCount !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
