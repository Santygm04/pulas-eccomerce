import React from "react";
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 PULAS - Moda Unisex</p>
        <div className="social-links">
          <a
            href="https://www.instagram.com/pulas.showroom?igsh=eDVpaHlqMzExd2Y0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="icon-link"
          >
            {/* Icono Instagram SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5C19.216 2 21 3.784 21 6.25v8.5c0 2.466-1.784 4.25-4.25 4.25h-8.5C4.784 19 3 17.216 3 14.75v-8.5C3 3.784 4.784 2 7.75 2zm0 1.5C5.955 3.5 4.5 4.955 4.5 6.75v8.5c0 1.795 1.455 3.25 3.25 3.25h8.5c1.795 0 3.25-1.455 3.25-3.25v-8.5c0-1.795-1.455-3.25-3.25-3.25h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm4.75-.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
          </a>
          <a
            href="https://wa.me/+5493814432135"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="icon-link2"
          >
            {/* Icono WhatsApp SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.82 11.82 0 0 0 3.36 20.64L2 22l1.36-1.36A11.84 11.84 0 0 0 12 24a11.87 11.87 0 0 0 8.52-3.52 11.8 11.8 0 0 0 0-16.96zm-8.53 16.12a9.16 9.16 0 0 1-4.93-1.41l-.35-.21-2.93.77.78-2.86-.23-.38a9.14 9.14 0 1 1 7.66 3.09zm5.9-7.29c-.31-.16-1.82-.9-2.1-1-.28-.11-.48-.16-.68.16s-.78.91-.96 1.1c-.18.2-.37.23-.68.08a5.56 5.56 0 0 1-1.63-1-6.15 6.15 0 0 1-1.14-1.42c-.12-.2 0-.31.09-.46.1-.15.23-.37.35-.56a.72.72 0 0 0 .11-.62c-.04-.2-.68-1.64-.93-2.24s-.47-.5-.68-.51a1.43 1.43 0 0 0-.66 0 1.18 1.18 0 0 0-.51.38 2.1 2.1 0 0 0-.81 1.94 8.46 8.46 0 0 0 1.8 3.68 16.62 16.62 0 0 0 3.7 3.58 8.61 8.61 0 0 0 2.24 1.1 3.23 3.23 0 0 0 1.66.14 2.53 2.53 0 0 0 1.83-1.15 3.3 3.3 0 0 0 .27-1.13c0-.18-.1-.29-.31-.45z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
