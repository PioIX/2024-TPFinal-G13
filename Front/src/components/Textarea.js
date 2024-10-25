"use client"
import styles from './Textarea.module.css';

export default function Textarea({placeholder, onChange}){
    
    function ponerTexto (evento){
        const valor = evento.target.value;
        onChange(valor);  // Notifica al componente padre del cambio.
    }

    return(
        <textarea className={styles.textareaField} placeholder={placeholder} onChange={ponerTexto} required></textarea>
    )
}