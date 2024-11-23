"use client";
import React, { useState } from "react";
import styles from "./ImageCarousel.module.css"; // Archivo CSS para los estilos

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para avanzar
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para retroceder
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className={styles.carousel}>
        {images.length > 0 ? (
          <>
            {/* Flecha izquierda */}
            <div className={styles.arrowLeft} onClick={prevImage}>
              &#8249; {/* Símbolo de flecha izquierda */}
            </div>
  
            {/* Imagen actual */}
            <img
              src={"data:image/jfif;base64," + Object(images)[currentIndex].imagen}
              alt={`Imagen ${currentIndex + 1}`}
              className={styles.image}
            />
  
            {/* Flecha derecha */}
            <div className={styles.arrowRight} onClick={nextImage}>
              &#8250; {/* Símbolo de flecha derecha */}
            </div>
  
            {/* Indicador */}
            <p className={styles.indicator}>
              {currentIndex + 1} de {images.length}
            </p>
          </>
        ) : (
          <p className={styles.noImages}>No hay imágenes disponibles</p>
        )}
      </div>
    </>
  );
};


export default ImageCarousel;
