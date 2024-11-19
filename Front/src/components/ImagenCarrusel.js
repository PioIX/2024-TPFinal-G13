"use client"
import React, { useState } from "react";

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
    <div>
      {/* Botón para retroceder */}
      <button onClick={prevImage} disabled={images.length === 0}>
        Anterior
      </button>

      {/* Mostrar imagen actual */}
      {images.length > 0 ? (
        <img
          src={"data:image/jfif;base64," + Object(images)[currentIndex].imagen} // Accede a la propiedad `imagen`
          alt={`Imagen ${currentIndex + 1}`}
          style={{ width: "300px", height: "200px", objectFit: "cover" }}
        />
      ) : (
        <p>No hay imágenes disponibles</p>
      )}

      {/* Botón para avanzar */}
      <button onClick={nextImage} disabled={images.length === 0}>
        Siguiente
      </button>

      {/* Indicador */}
      <p>
        {currentIndex + 1} de {images.length}
      </p>
    </div>
  );
};

export default ImageCarousel;
