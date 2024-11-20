import { useState } from "react";
import Image from "next/image";
import styles from "./ImageCarousel.module.css"; // El archivo CSS para estilos

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return <div>No hay imágenes disponibles</div>;
  }

  return (
    <div className={styles.carousel}>
      {/* Flecha izquierda */}
      <button className={styles.arrow} onClick={handlePrev}>
        &#9664;
      </button>

      {/* Imagen actual */}
      <div className={styles.imageContainer}>
        <Image
          src={"data:image/jfif;base64," + images[currentIndex].imagen}
          alt={`Imagen ${currentIndex}`}
          width={400}
          height={300}
          className={styles.image}
        />
      </div>

      {/* Flecha derecha */}
      <button className={styles.arrow} onClick={handleNext}>
        &#9654;
      </button>
    </div>
  );
}
