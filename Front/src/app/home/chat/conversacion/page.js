"use client"
import { useSocket } from "../../../../hooks/useSocket"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../../components/Registro";
import Button from "../../../../components/Button";
import Login from "../../../../components/Login";
import Text from "../../../../components/Text";
import ButtonMensaje from "../../../../components/ButtonMensaje";
import Chat from "../../../../components/Chat";

export default function mensajes() {
    
    const [mensajes, setMensajes] = useState([]);
    const [idChat, setIdChat] = useState([]);
  
  const router = useRouter();

  const getVector = async (idChat) => {
    console.log("id es: "+ idChat)
    const response = await fetch(`http://localhost:4000/mensajes?idChat=` + idChat, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    const result = await response.json();
    console.log(result)
    
    setMensajes(result);
    console.log(mensajes)
};

useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("idChat");

    if (id) {
      setIdChat(parseInt(id, 10)); // Convertir a número
      getVector(id);
    }

    getVector(id);
}, []);

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