"use client"

import { useState, useEffect, useCallback } from "react"
import ProductList from "../ProductList/ProductList"
import FilterSidebar from "../FiltreSidebar/FilterSidebar"
import "./Mujer.css"

export default function Mujer() {
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [hasActiveFilters, setHasActiveFilters] = useState(false)

  // 🔄 Resetear filtros cuando se monta el componente
  useEffect(() => {
    setShowFilters(false)
    setFilteredProducts([])
    setHasActiveFilters(false)
  }, [])

  // 🔧 Función memoizada para manejar cambios de filtros
  const handleFiltersChange = useCallback((products, hasFilters) => {
    setFilteredProducts(products)
    setHasActiveFilters(hasFilters)
  }, [])

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  // 🔄 Función para resetear filtros manualmente
  const resetFilters = () => {
    setShowFilters(false)
    setFilteredProducts([])
    setHasActiveFilters(false)
  }

  return (
    <section className="mujer-container">
      <div className="page-header">
        <h1 className="mujer-title">Ropa Femenina</h1>
        <div className="header-buttons">
          {hasActiveFilters && (
            <button onClick={resetFilters} className="reset-filters-btn">
              🔄 Ver Todas las Secciones
            </button>
          )}
          <button onClick={toggleFilters} className="filters-toggle-btn">
            🔍 Filtros
          </button>
        </div>
      </div>

      {/* Mostrar productos filtrados si hay filtros activos */}
      {hasActiveFilters ? (
        <section className="filtered-results">
          <h2 className="filter-results-title">📋 Resultados Filtrados ({filteredProducts.length} productos)</h2>
          <div className="product-list-wrapper">
            {filteredProducts.length > 0 ? (
              <ProductList productos={filteredProducts} />
            ) : (
              <div className="no-results">
                <p>❌ No se encontraron productos con los filtros seleccionados</p>
                <button onClick={resetFilters} className="back-to-sections-btn">
                  ← Volver a las secciones
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Secciones normales cuando no hay filtros */
        <>
          <section className="product-section">
            <h2 className="section-title">Remeras</h2>
            <div className="product-list-wrapper">
              <ProductList filtroCategoria="mujer" subCategoria="remeras" />
            </div>
          </section>

          <section className="product-section">
            <h2 className="section-title">Pantalones</h2>
            <div className="product-list-wrapper">
              <ProductList filtroCategoria="mujer" subCategoria="pantalones" />
            </div>
          </section>

          <section className="product-section">
            <h2 className="section-title">Buzos</h2>
            <div className="product-list-wrapper">
              <ProductList filtroCategoria="mujer" subCategoria="buzos" />
            </div>
          </section>

          <section className="product-section">
            <h2 className="section-title">Tops</h2>
            <div className="product-list-wrapper">
              <ProductList filtroCategoria="mujer" subCategoria="tops" />
            </div>
          </section>

          <section className="product-section">
            <h2 className="section-title">Camperas</h2>
            <div className="product-list-wrapper">
              <ProductList filtroCategoria="mujer" subCategoria="camperas" />
            </div>
          </section>
        </>
      )}

      {/* Sidebar de Filtros */}
      <FilterSidebar
        isOpen={showFilters}
        onToggle={toggleFilters}
        onFiltersChange={handleFiltersChange}
        currentCategory="mujer"
        key="mujer-filters"
      />
    </section>
  )
}
