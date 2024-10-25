"use client"
import React from "react";
import styles from './Contacto.module.css';
import Input from "... @/components/Inputs";
import Button from "./Button";
import Textarea from "./Textarea";
import { useEffect, useState } from "react";

// App Component (Main Entry)
export default function ContactForm(){
    
  function redirigir(){
    location.href = "/home/contacto"
  }

    const [nombreApellido, setNombreApellido] = useState('');
    const [mail, setMail] = useState('');
    const [asunto, setAsunto] = useState('');
    const [texto, setTexto] = useState('');



    const handleClick = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        console.log("inicio function")
        const data = {
            nombreApellido: nombreApellido,
            mail: mail,
            asunto: asunto,
            texto: texto,
            idUsuario: localStorage.getItem("idUsuario"),
        };
        console.log(data)

        const response = await fetch('http://localhost:4000/addComentario',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                },
            body:JSON.stringify(data),
        })
        
        console.log(response)
        let respuesta = await response.json();
        console.log(respuesta)
        if (respuesta.success == true){
            alert("Comentario agregado")
            redirigir()
        } else {
            alert("Comentario no agregado")
        }  
    } //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 

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
            <Input type="text" placeholder="Nombre y apellido" onChange={setNombreApellido}/> 
            </div>
            <div className={styles.usuario}>
            <Input type="text" placeholder="Asunto" onChange={setAsunto}/>
            </div>
            <div className={styles.usuario}>
            <Input type="email" placeholder="Mail" onChange={setMail}/>
            </div>
            
            
            <Textarea placeholder="Dejanos tu comentario" onChange={setTexto}/>
            <div className={styles.button}>
                <Button className={styles.button} onClick={handleClick} text="Enviar comentario" />
            </div>
        </form>
        </div>
      </div>
    </section>
  </div>
    )
}