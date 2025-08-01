import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
function Home() {
  return (
    <section className="home-hero">
      <div className="overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Bienvenidos a PULAS</h1>
        <p className="hero-subtitle">Ropa unisex que rompe estereotipos y resalta tu estilo único.</p>
        <Link to="/hombre" className="btn">Ver Colección</Link>

        <div className="info-section">
          <p>
            En <strong>PULAS</strong> creemos que la moda no tiene género. Nuestra colección está diseñada para todos: cómoda, moderna y con identidad.
          </p>
          <p>
            Descubrí prendas pensadas para acompañarte todos los días, sin importar etiquetas. 
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;