import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (nuevoProducto) => {
    const productoConId = { ...nuevoProducto, id: generarIdUnico() };
    setProductos((prev) => [...prev, productoConId]);
  };

  const actualizarProducto = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoActualizado.id ? productoActualizado : p))
    );
  };

  const updateStock = (productId, talle, color, cantidad) => {
    setProductos((prev) =>
      prev.map((producto) => {
        if (producto.id !== productId) return producto;

        const nuevoStock = { ...producto.stock };
        if (!nuevoStock[talle]) nuevoStock[talle] = {};
        nuevoStock[talle][color] = cantidad;

        return { ...producto, stock: nuevoStock };
      })
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== id));
  };

  const generarIdUnico = () => `prod-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <ProductContext.Provider
      value={{
        productos,
        agregarProducto,
        actualizarProducto,
        updateStock,
        eliminarProducto, // ✅ agregado
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductContext);
}
