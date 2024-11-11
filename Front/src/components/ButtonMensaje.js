"use client"
import clsx from 'clsx';
import styles from './ButtonMensaje.module.css';
import { useEffect } from 'react';

/*export default function Button (props){
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}*/


export default function ButtonMensaje({ onClick, text, variant }) {
    useEffect(() => {
      // Función para manejar la tecla Enter
      const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          onClick();  // Ejecutar la función onClick cuando se presiona Enter
        }
      };
  
      // Agregar el listener para el evento keydown
      document.addEventListener("keydown", handleKeyPress);
  
      // Limpiar el listener cuando el componente se desmonte
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [onClick]);  // Solo se vuelve a crear el efecto si cambia onClick
  
    return (
      <button
        className={clsx({
          [styles.button]: true,
          [styles[variant]]: variant,  // Usar el prop variant si se pasa uno
        })}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }