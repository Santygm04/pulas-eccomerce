"use client"

import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"
import PaymentGateway from "../PaymentGateway/PaymentGateway"
import "./Cart.css"

export default function Cart() {
  const { carrito, quitarDelCarrito, vaciarCarrito, actualizarCantidad } = useCart()
  const [showPayment, setShowPayment] = useState(false)

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const envio = subtotal > 15000 ? 0 : 2500 // Envío gratis por compras mayores a $15000
  const total = subtotal + envio

  const handleCheckout = () => {
    setShowPayment(true)
  }

  const handleBackToCart = () => {
    setShowPayment(false)
  }

  if (showPayment) {
    return <PaymentGateway items={carrito} subtotal={subtotal} envio={envio} total={total} onBack={handleBackToCart} />
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Tu Carrito</h1>

      {carrito.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <p className="empty-cart-text">Tu carrito está vacío</p>
          <Link to="/hombre" className="continue-shopping-btn">
            Continuar Comprando
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {carrito.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.imagen || "/placeholder.svg?height=80&width=80"}
                  alt={item.nombre}
                  className="item-image"
                />

                <div className="item-details">
                  <h3 className="item-name">{item.nombre}</h3>
                  <p className="item-specs">
                    Talle: {item.talle} | Color: {item.color}
                  </p>
                  <p className="item-price">${item.precio.toLocaleString()}</p>
                </div>

                <div className="item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-number">{item.cantidad}</span>
                  <button className="quantity-btn" onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>
                    +
                  </button>
                </div>

                <button onClick={() => quitarDelCarrito(item.id)} className="remove-btn">
                  🗑️ Quitar
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Resumen del Pedido</h3>

            <div className="summary-row">
              <span className="summary-label">Subtotal ({carrito.length} productos)</span>
              <span className="summary-value">${subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Envío</span>
              <span className="summary-value">{envio === 0 ? "¡GRATIS!" : `$${envio.toLocaleString()}`}</span>
            </div>

            {envio === 0 && (
              <div className="summary-row">
                <small style={{ color: "#00b894", fontWeight: "600" }}>
                  🎉 ¡Envío gratis por compra mayor a $15.000!
                </small>
              </div>
            )}

            <div className="summary-row summary-total">
              <span className="summary-label">Total</span>
              <span className="summary-value">${total.toLocaleString()}</span>
            </div>

            <div className="cart-actions">
              <button onClick={vaciarCarrito} className="clear-cart-btn">
                🗑️ Vaciar Carrito
              </button>

              <button onClick={handleCheckout} className="checkout-btn">
                💳 Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
