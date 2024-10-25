"use client"
import React from "react";
import styles from './Contacto.module.css';
import Input from "... @/components/Inputs";
import Button from "./Button";

// App Component (Main Entry)
export default function ContactForm(){
    
    function redirigir(){
        
    }

    return(
        // for i in chats
        <div className={styles.body}>
    <section className={styles.contacto}>
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3294.625611296844!2d-58.37390441236816!3d-34.623701314689605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d2b2275329%3A0x217c4f6f7b6d322f!2sDefensa%201357%2C%20C1143AAC%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1728935032116!5m2!1ses!2sar"
            width="100%"
            height="600"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.iframe}
          ></iframe>
        </div>
        <div className={styles.formContainer}>
            <h1 className={styles.heading}>Dejanos tu contacto</h1>
            <form className={styles.formGroup}>
            <div className={styles.usuario}>
            <Input placeholder="Nombre y apellido" /> 
            </div>
            <div className={styles.usuario}>
            <Input placeholder="Teléfono" />
            </div>
            <div className={styles.usuario}>
            <Input placeholder="Email" />
            </div>
            
            
            
            <textarea className={styles.textareaField} placeholder="Dejanos tus comentarios" required></textarea>
            <div className={styles.button}>
                <Button className={styles.button} onClick={redirigir} text="Enviar comentario" />
            </div>
        </form>
        </div>
      </div>
    </section>
  </div>
    )
}