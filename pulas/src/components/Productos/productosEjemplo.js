import remeraImg from "../../assets/Hombre/remera.jpg"

const productosIniciales = [
  {
    id: "prod-001",
    nombre: "Remera Básica Negra",
    descripcion: "Remera de algodón 100%",
    precio: 5999,
    categoria: "hombre",
    subCategoria: "remeras",
    imagen: remeraImg,
    stock: {
      S: { negro: 3, blanco: 2 },
      M: { negro: 1, blanco: 0 },
      L: { negro: 5, blanco: 4 },
    },
  },
  {
    id: "prod-002",
    nombre: "Pantalón Jogger Gris",
    descripcion: "Jogger cómodo para uso diario",
    precio: 8999,
    categoria: "hombre",
    subCategoria: "pantalonescargo",
    imagen: "https://via.placeholder.com/200x250?text=Jogger+Gris",
    stock: {
      M: { gris: 2 },
      L: { gris: 1 },
    },
  },
];

export default productosIniciales;