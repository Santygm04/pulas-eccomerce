import { useState } from "react";
import { useProductos } from "../../context/ProductContext";
import "./StockManager.css";

const talles = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const colores = ["negro", "blanco", "gris", "azul", "rojo", "verde", "beige", "marrón"];

export default function StockManager() {
  const { productos, updateStock, eliminarProducto } = useProductos(); // ✅

  const productosValidos = productos.filter(
    (p) => p.nombre?.trim() !== "" && typeof p.stock === "object"
  );

  const [edits, setEdits] = useState({});

  const handleStockChange = (id, talle, color, value) => {
    const cantidad = parseInt(value) || 0;
    setEdits((prev) => {
      const productoEditado = { ...(prev[id] || {}) };
      if (!productoEditado[talle]) productoEditado[talle] = {};
      productoEditado[talle][color] = cantidad;
      return { ...prev, [id]: productoEditado };
    });
  };

  const guardarCambios = () => {
    for (const id in edits) {
      const cambiosProducto = edits[id];
      for (const talle in cambiosProducto) {
        for (const color in cambiosProducto[talle]) {
          updateStock(id, talle, color, cambiosProducto[talle][color]);
        }
      }
    }
    setEdits({});
    alert("✅ Todos los cambios fueron guardados");
  };

  return (
    <div className="stock-manager">
      {productosValidos.map((producto) => (
        <div key={producto.id} className="stock-card">
          <h3>{producto.nombre}</h3>
          <div className="stock-grid">
            {talles.map((talle) => (
              <div key={talle} className="stock-row">
                <strong className="stock-talle-label">{talle}</strong>
                {colores.map((color) => {
                  const valorEditado = edits[producto.id]?.[talle]?.[color];
                  const valorOriginal = producto.stock?.[talle]?.[color] ?? "";
                  return (
                    <div key={color} className="stock-input-wrapper">
                      <label className="stock-color-label">
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={valorEditado !== undefined ? valorEditado : valorOriginal}
                        onChange={(e) =>
                          handleStockChange(producto.id, talle, color, e.target.value)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* ✅ Botón de eliminar producto */}
          <button
            className="btn-eliminar-producto"
            onClick={() => {
              const confirmar = confirm(`¿Seguro que querés eliminar "${producto.nombre}"?`);
              if (confirmar) eliminarProducto(producto.id);
            }}
          >
            🗑️ Eliminar Producto
          </button>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="boton-guardar-general" onClick={guardarCambios}>
          💾 Guardar Todos los Cambios
        </button>
      </div>
    </div>
  );
}
