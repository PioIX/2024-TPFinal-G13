"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";

export default function mensajes() {
  
  const router = useRouter();

  function handleClick(){ //Links con logica
      //Metodo push para registrar en el historial el cambio de pantalla
      //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 
  }
  
  const [variant, serVariant] = useState("login")

  return (
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <>
      <header className={styles.header}>
      </header>
      <div className={styles.container}>
      
      <div className={styles.contactos}>
      </div>
      <div className={styles.chatContainer}>
        <Chat/>
      </div>
      </div>
    </>
  );
}