"use client"

import { useState } from "react"
import "./Contactos.css"

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  // 📱 Tu número de WhatsApp (cambia por el tuyo)
  const WHATSAPP_NUMBER = "5493814432135"

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const enviarConsulta = () => {
    const mensaje = encodeURIComponent("¡Hola! Quiero hacer una consulta sobre los productos de PULAS. 👋")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, "_blank")
  }

  const enviarPedidoPersonalizado = () => {
    if (!formData.nombre || !formData.mensaje) {
      alert("Por favor completa al menos tu nombre y mensaje")
      return
    }

    const mensaje = `🛍️ *CONSULTA PERSONALIZADA - PULAS*

👤 *Cliente:* ${formData.nombre}
📧 *Email:* ${formData.email || "No especificado"}
📱 *Teléfono:* ${formData.telefono || "No especificado"}

💬 *Mensaje:*
${formData.mensaje}

---
Enviado desde pulas.shop`

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`
    window.open(whatsappUrl, "_blank")

    // Limpiar formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      mensaje: "",
    })

    alert("¡Mensaje enviado! Te responderemos pronto por WhatsApp.")
  }

  return (
    <div className="contacto-container">
      {/* Header */}
      <div className="contacto-header">
        <h1 className="contacto-title">📞 Contactanos</h1>
        <p className="contacto-subtitle">
          Estamos aquí para ayudarte. Escribinos por WhatsApp o completá el formulario
        </p>
      </div>

      {/* Contenido Principal */}
      <div className="contacto-content">
        {/* Información de Contacto */}
        <div className="contacto-info">
          <h2 className="info-title">📍 Información de Contacto</h2>

          <div className="info-item">
            <div className="info-icon">📱</div>
            <div className="info-content">
              <h4>WhatsApp</h4>
              <p>+54 9 381 443-2135</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-content">
              <h4>Email</h4>
              <p>admin@pulas.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-content">
              <h4>Ubicación</h4>
              <p>Tucumán, Argentina</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">🚚</div>
            <div className="info-content">
              <h4>Envíos</h4>
              <p>A todo el país</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">💳</div>
            <div className="info-content">
              <h4>Pagos</h4>
              <p>Transferencia • 2 Cuotas</p>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="contacto-form">
          <h2 className="form-title">✉️ Envianos un Mensaje</h2>

          <div className="form-group">
            <label className="form-label">👤 Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="form-input"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📧 Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="tu@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">📱 Teléfono</label>
            <input
              type="tel"
              name="telefono"
              className="form-input"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="11 1234-5678"
            />
          </div>

          <div className="form-group">
            <label className="form-label">💬 Mensaje *</label>
            <textarea
              name="mensaje"
              className="form-textarea"
              value={formData.mensaje}
              onChange={handleInputChange}
              placeholder="Contanos qué necesitas: consulta sobre productos, talles, colores, pedidos especiales, etc."
              required
            />
          </div>

          <div className="whatsapp-buttons">
            <button onClick={enviarConsulta} className="whatsapp-btn consulta">
              💬 Consulta Rápida
            </button>
            <button onClick={enviarPedidoPersonalizado} className="whatsapp-btn pedido">
              📝 Enviar Mensaje
            </button>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <div className="social-section">
        <h2 className="social-title">🌟 Seguinos en Redes</h2>
        <div className="social-links">
          <a
            href="https://www.instagram.com/pulas.showroom?igsh=eDVpaHlqMzExd2Y0"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link instagram"
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link whatsapp"
            aria-label="WhatsApp"
          >
            💬
          </a>
        </div>
      </div>

      {/* Horarios de Atención */}
      <div className="horarios-section">
        <h2 className="horarios-title">🕐 Horarios de Atención</h2>
        <div className="horarios-content">
          <p>
            <strong>Lunes a Viernes:</strong> 9:00 - 18:00 hs
          </p>
          <p>
            <strong>Sábados:</strong> 9:00 - 13:00 hs
          </p>
          <p>
            <strong>Domingos:</strong> Cerrado
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.9rem", opacity: "0.8" }}>💡 Respondemos WhatsApp las 24hs</p>
        </div>
      </div>
    </div>
  )
}
