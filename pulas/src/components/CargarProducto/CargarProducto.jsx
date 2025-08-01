"use client"

import { useState } from "react"
import "./CargarProducto.css"

const talles = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const colores = ["negro", "blanco", "rojo", "azul", "verde", "beige", "marron"]

export default function ProductoUploader({ onProductoSubido }) {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
    subCategoria: "",
    stock: {},
  })

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }

  const handleStockChange = (talle, color, cantidad) => {
    setProducto((prev) => {
      const nuevoStock = { ...prev.stock }
      if (!nuevoStock[talle]) nuevoStock[talle] = {}
      nuevoStock[talle][color] = Number.parseInt(cantidad) || 0
      return { ...prev, stock: nuevoStock }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!producto.nombre || !producto.precio) {
      alert("Completa al menos el nombre y precio")
      return
    }

    const nuevoProducto = {
      ...producto,
      id: crypto.randomUUID(),
      precio: Number.parseFloat(producto.precio),
    }

    onProductoSubido(nuevoProducto)
    setProducto({
      nombre: "",
      descripcion: "",
      precio: "",
      imagen: "",
      categoria: "",
      subCategoria: "",
      stock: {},
    })
    alert("✅ Producto cargado exitosamente")
  }

  return (
    <form className="uploader-form" onSubmit={handleSubmit}>
      {/* 📝 DATOS GENERALES EN GRID */}
      <div className="datos-generales">
        <input
          type="text"
          name="nombre"
          placeholder="📝 Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="precio"
          placeholder="💰 Precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="imagen"
          placeholder="🖼️ URL de imagen"
          value={producto.imagen}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="📄 Descripción del producto"
          value={producto.descripcion}
          onChange={handleChange}
        />

        <select name="categoria" value={producto.categoria} onChange={handleChange} required>
          <option value="">👥 Seleccionar categoría</option>
          <option value="hombre">👨 Hombre</option>
          <option value="mujer">👩 Mujer</option>
        </select>

        <select name="subCategoria" value={producto.subCategoria} onChange={handleChange} required>
          <option value="">🏷️ Seleccionar subcategoría</option>
          <option value="remeras">👕 Remeras</option>
          <option value="pantalones">👖 Pantalones</option>
          <option value="remerasTermicas">🧥 Remeras Térmicas</option>
          <option value="pantalonescargo">👖 Pantalones/Jogger/Cargo</option>
          <option value="camperas">🧥 Camperas</option>
          <option value="buzos">👘 Buzos</option>
          <option value="tops">👚 Tops</option>
        </select>
      </div>

      {/* 🖼️ PREVIEW DE IMAGEN */}
      {producto.imagen && (
        <div className="preview-container">
          <img src={producto.imagen || "/placeholder.svg"} alt="Preview" className="preview-img" />
        </div>
      )}

      {/* 📦 SECCIÓN DE STOCK COMPACTA */}
      <div className="stock-section">
        <h4>📦 Stock por Talle y Color</h4>
        <div className="stock-grid">
          {talles.map((talle) => (
            <div className="talle-bloque" key={talle}>
              <h5>{talle}</h5>
              <div className="color-inputs">
                {colores.map((color) => (
                  <div className="color-item" key={color}>
                    <label>
                      {color === "negro"
                        ? "⚫"
                        : color === "blanco"
                          ? "⚪"
                          : color === "rojo"
                            ? "🔴"
                            : color === "azul"
                              ? "🔵"
                              : color === "verde"
                                ? "🟢"
                                : color === "beige"
                                  ? "🟤"
                                  : color === "marron"
                                    ? "🤎"
                                    : "⚫"}
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      max="99"
                      value={producto.stock?.[talle]?.[color] || ""}
                      onChange={(e) => handleStockChange(talle, color, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="boton-subir">
        🚀 Subir Producto
      </button>
    </form>
  )
}
