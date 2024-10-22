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

export default function equipo() {
  
  const router = useRouter();

  function redirigir(){
    location.href = "/home/propiedades/crearPropiedad?idUsuario=" + localStorage.getItem("idUsuario")
  }

  return (
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <div className={styles.button}>
      <Button className={styles.button} onClick={redirigir} text="Agregar Propiedad" />
    </div>
  );
}