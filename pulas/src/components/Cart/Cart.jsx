"use client"

import { useState } from "react"
import { useCart } from "../../context/CartContext"
import { Link } from "react-router-dom"
import PaymentGateway from "../PaymentGateway/PaymentGateway"
import "./Cart.css"

export default function Cart() {
  const { carrito, quitarDelCarrito, vaciarCarrito, actualizarCantidad } = useCart()
  const [showPayment, setShowPayment] = useState(false)
  const [shippingOption, setShippingOption] = useState("pickup") // "pickup" o "delivery"

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  // 🚚 Lógica de envío mejorada
  const getShippingCost = () => {
    if (shippingOption === "pickup") return 0
    return subtotal > 15000 ? 0 : 2500
  }

  const envio = getShippingCost()
  const total = subtotal + envio

  const handleCheckout = () => {
    setShowPayment(true)
  }

  const handleBackToCart = () => {
    setShowPayment(false)
  }

  if (showPayment) {
    return (
      <PaymentGateway
        items={carrito}
        subtotal={subtotal}
        envio={envio}
        total={total}
        shippingOption={shippingOption}
        onBack={handleBackToCart}
      />
    )
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

            {/* 🚚 SECCIÓN DE OPCIONES DE ENVÍO */}
            <div className="shipping-section">
              <h4 className="shipping-title">🚚 Opciones de Entrega</h4>
              <div className="shipping-options">
                <div
                  className={`shipping-option ${shippingOption === "pickup" ? "selected" : ""}`}
                  onClick={() => setShippingOption("pickup")}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="pickup"
                    checked={shippingOption === "pickup"}
                    onChange={() => setShippingOption("pickup")}
                    className="shipping-radio"
                  />
                  <div className="shipping-info">
                    <div className="shipping-label">🏪 Retiro en Local</div>
                    <div className="shipping-description">Retirá tu pedido en nuestro showroom</div>
                  </div>
                  <div className="shipping-price">GRATIS</div>
                </div>

                <div
                  className={`shipping-option ${shippingOption === "delivery" ? "selected" : ""}`}
                  onClick={() => setShippingOption("delivery")}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="delivery"
                    checked={shippingOption === "delivery"}
                    onChange={() => setShippingOption("delivery")}
                    className="shipping-radio"
                  />
                  <div className="shipping-info">
                    <div className="shipping-label">📦 Envío a Domicilio</div>
                    <div className="shipping-description">
                      {subtotal > 15000 ? "¡Envío gratis por compra mayor a $15.000!" : "Envío a todo el país"}
                    </div>
                  </div>
                  <div className="shipping-price">{subtotal > 15000 ? "GRATIS" : "$2.500"}</div>
                </div>
              </div>
            </div>

            <div className="summary-row">
              <span className="summary-label">Subtotal ({carrito.length} productos)</span>
              <span className="summary-value">${subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">{shippingOption === "pickup" ? "Retiro en local" : "Envío"}</span>
              <span className="summary-value">{envio === 0 ? "¡GRATIS!" : `$${envio.toLocaleString()}`}</span>
            </div>

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
