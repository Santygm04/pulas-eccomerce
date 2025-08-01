// src/components/ProductCard/ProductCard.jsx
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ producto }) {
  const { agregarAlCarrito } = useCart();
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");

  const stock = producto.stock || {};

  const tallesDisponibles = Object.entries(stock).filter(([_, colores]) =>
    Object.values(colores).some((cantidad) => cantidad > 0)
  );

  const coloresDisponibles = talle
    ? Object.entries(stock[talle] || {}).filter(([, cantidad]) => cantidad > 0)
    : [];

  const handleAgregar = () => {
    if (talle && color) {
      agregarAlCarrito(producto, talle, color);
    } else {
      alert("Seleccioná un talle y un color");
    }
  };

  return (
    <div className="product-card">
      <img src={producto.imagen} alt={producto.nombre} className="product-img" />
      <h3 className="product-title">{producto.nombre}</h3>
      <p className="product-desc">{producto.descripcion}</p>
      <p className="product-price">${producto.precio}</p>

      <select className="product-select" value={talle} onChange={(e) => {
        setTalle(e.target.value);
        setColor("");
      }}>
        <option value="">Seleccioná un talle</option>
        {tallesDisponibles.map(([t]) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select className="product-select" value={color} onChange={(e) => setColor(e.target.value)} disabled={!talle}>
        <option value="">Seleccioná un color</option>
        {coloresDisponibles.map(([c]) => (
          <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
        ))}
      </select>

      <button onClick={handleAgregar} className="add-to-cart-btn" disabled={!talle || !color}>
        🛒 Agregar al carrito
      </button>
    </div>
  );
}
