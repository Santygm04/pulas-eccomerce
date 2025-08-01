"use client"

import { useState } from "react"
import "./PaymentGateway.css"

export default function PaymentGateway({ items, subtotal, envio, total, shippingOption, onBack }) {
  const [paymentMethod, setPaymentMethod] = useState("full")
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    notas: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 📱 TU NÚMERO DE WHATSAPP (cambia este número por el tuyo)
  const WHATSAPP_BUSINESS = "5493814432135" // Formato: código país + número sin espacios ni símbolos

  const installmentAmount = Math.ceil(total / 2)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular procesamiento
    setTimeout(() => {
      const paymentType = paymentMethod === "full" ? "pago completo" : "2 cuotas"
      const fechaHora = new Date().toLocaleString("es-AR")
      const deliveryType = shippingOption === "pickup" ? "RETIRO EN LOCAL" : "ENVÍO A DOMICILIO"

      // 📝 Mensaje que se enviará a tu WhatsApp
      const message = `🛍️ *NUEVO PEDIDO - PULAS*

📅 *Fecha:* ${fechaHora}
🆔 *ID Pedido:* #${Date.now().toString().slice(-6)}

👤 *CLIENTE:*
• Nombre: ${formData.nombre}
• Email: ${formData.email}
• Teléfono: ${formData.telefono}
${
  shippingOption === "delivery"
    ? `• Dirección: ${formData.direccion}
• Ciudad: ${formData.ciudad}
• Código Postal: ${formData.codigoPostal || "No especificado"}`
    : ""
}

📦 *PRODUCTOS:*
${items
  .map(
    (item, index) =>
      `${index + 1}. ${item.nombre}
   • Talle: ${item.talle}
   • Color: ${item.color}
   • Cantidad: ${item.cantidad}
   • Precio unitario: $${item.precio.toLocaleString()}
   • Subtotal: $${(item.precio * item.cantidad).toLocaleString()}`,
  )
  .join("\n\n")}

🚚 *TIPO DE ENTREGA:* ${deliveryType}
${shippingOption === "pickup" ? "📍 Cliente retira en showroom" : "📦 Envío a la dirección indicada"}

💰 *RESUMEN FINANCIERO:*
• Subtotal productos: $${subtotal.toLocaleString()}
• Costo de ${shippingOption === "pickup" ? "retiro" : "envío"}: ${envio === 0 ? "GRATIS ✅" : `$${envio.toLocaleString()}`}
• *TOTAL: $${total.toLocaleString()}*

💳 *MÉTODO DE PAGO:* ${paymentType.toUpperCase()}
${
  paymentMethod === "installments"
    ? `• 1ra cuota (ahora): $${installmentAmount.toLocaleString()}
• 2da cuota (30 días): $${installmentAmount.toLocaleString()}`
    : `• Monto total: $${total.toLocaleString()}`
}

🏦 *ALIAS PARA TRANSFERENCIA:* pulas.shop.mp

${formData.notas ? `📝 *NOTAS ESPECIALES:*\n${formData.notas}\n\n` : ""}

⚠️ *IMPORTANTE:* Cliente debe enviar comprobante de transferencia para confirmar pedido.

---
Enviado automáticamente desde pulas.shop`

      // 🚀 Abrir WhatsApp con el mensaje
      const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      setIsSubmitting(false)

      // Mostrar confirmación al cliente
      alert(`✅ ¡Pedido enviado correctamente!

Tu pedido #${Date.now().toString().slice(-6)} ha sido enviado.

📱 Te contactaremos por WhatsApp para confirmar.
💳 Recordá transferir a: pulas.shop.mp
${shippingOption === "pickup" ? "🏪 Retiro en nuestro showroom" : "📦 Envío a tu domicilio"}

¡Gracias por tu compra!`)

      // Opcional: Limpiar formulario después del envío
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        codigoPostal: "",
        notas: "",
      })
    }, 2000)
  }

  const isFormValid =
    formData.nombre &&
    formData.email &&
    formData.telefono &&
    (shippingOption === "pickup" || (formData.direccion && formData.ciudad))

  return (
    <div className="payment-container">
      <div className="payment-header">
        <button onClick={onBack} className="back-btn">
          ← Volver al Carrito
        </button>
        <h1 className="payment-title">💳 Finalizar Compra</h1>
      </div>

      <div className="payment-content">
        {/* Resumen del Pedido */}
        <div className="order-summary">
          <h3 className="summary-title">📋 Resumen del Pedido</h3>

          {items.map((item) => (
            <div key={item.id} className="order-item">
              <div className="item-info">
                <div className="item-name">{item.nombre}</div>
                <div className="item-details">
                  {item.talle} | {item.color} | Cantidad: {item.cantidad}
                </div>
              </div>
              <div className="item-total">${(item.precio * item.cantidad).toLocaleString()}</div>
            </div>
          ))}

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>{shippingOption === "pickup" ? "Retiro:" : "Envío:"}</span>
              <span>{envio === 0 ? "¡GRATIS!" : `$${envio.toLocaleString()}`}</span>
            </div>
            <div className="total-row total-final">
              <span>Total:</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          {/* 🚚 Indicador de tipo de entrega */}
          <div
            style={{
              background: shippingOption === "pickup" ? "#e8f5e8" : "#e3f2fd",
              padding: "1rem",
              borderRadius: "10px",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            <strong>{shippingOption === "pickup" ? "🏪 RETIRO EN LOCAL" : "📦 ENVÍO A DOMICILIO"}</strong>
          </div>
        </div>

        {/* Formulario de Pago */}
        <div className="payment-form">
          <h3 className="form-title">💰 Método de Pago</h3>

          {/* Opciones de Pago */}
          <div className="payment-options">
            <div
              className={`payment-option ${paymentMethod === "full" ? "active" : ""}`}
              onClick={() => setPaymentMethod("full")}
            >
              <div className="option-title">💸 Pago Completo</div>
              <div className="option-subtitle">${total.toLocaleString()}</div>
            </div>

            <div
              className={`payment-option ${paymentMethod === "installments" ? "active" : ""}`}
              onClick={() => setPaymentMethod("installments")}
            >
              <div className="option-title">📅 2 Cuotas</div>
              <div className="option-subtitle">${installmentAmount.toLocaleString()} c/u</div>
            </div>
          </div>

          {paymentMethod === "installments" && (
            <div className="installment-info">
              <div className="installment-amount">
                💡 Pagarás ${installmentAmount.toLocaleString()} ahora y ${installmentAmount.toLocaleString()} en 30
                días
              </div>
            </div>
          )}

          {/* Información del Alias */}
          <div className="alias-info">
            <div className="alias-title">💳 Transferí a nuestro alias:</div>
            <div className="alias-value">santygilmina</div>
            <div className="alias-instructions">Después de transferir, envianos el comprobante por WhatsApp</div>
          </div>

          {/* Formulario de Datos */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">👤 Nombre Completo *</label>
              <input
                type="text"
                name="nombre"
                className="form-input"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label className="form-label">📧 Email *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">📱 Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                className="form-input"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                placeholder="11 1234-5678"
              />
            </div>

            {/* 🚚 Campos condicionales según tipo de entrega */}
            {shippingOption === "delivery" && (
              <>
                <div className="form-group">
                  <label className="form-label">🏠 Dirección *</label>
                  <input
                    type="text"
                    name="direccion"
                    className="form-input"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                    placeholder="Calle y número"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">🏙️ Ciudad *</label>
                  <input
                    type="text"
                    name="ciudad"
                    className="form-input"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu ciudad"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">📮 Código Postal</label>
                  <input
                    type="text"
                    name="codigoPostal"
                    className="form-input"
                    value={formData.codigoPostal}
                    onChange={handleInputChange}
                    placeholder="1234"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">📝 Notas adicionales</label>
              <textarea
                name="notas"
                className="form-textarea"
                value={formData.notas}
                onChange={handleInputChange}
                placeholder={
                  shippingOption === "pickup"
                    ? "Horarios preferidos para retirar, instrucciones especiales, etc."
                    : "Instrucciones especiales, horarios de entrega, etc."
                }
              />
            </div>

            <button type="submit" className="submit-btn" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "📤 Enviando..." : "🚀 Confirmar Pedido"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
