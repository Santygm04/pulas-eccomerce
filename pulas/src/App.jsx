"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Hombre from "./components/Hombre/Hombre"
import Mujer from "./components/Mujer/Mujer"
import Contacto from "./components/Contactos/Contactos"
import Carrito from "./components/Cart/Cart"
import Admin from "./components/AdminPanel/AdminPanel"
import { CartProvider } from "./context/CartContext"
import { UserProvider, useUser } from "./context/UserContext"
import { ProductProvider } from "./context/ProductContext"

function AppRoutes() {
  const { user } = useUser()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hombre" element={<Hombre />} />
      <Route path="/mujer" element={<Mujer />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/carrito" element={<Carrito />} />
      {user?.isAdmin && <Route path="/admin" element={<Admin />} />}
    </Routes>
  )
}

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Router basename={import.meta.env.DEV ? "/" : "/pulas-shop"}>
            <Navbar />
            <AppRoutes />
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}

export default App
