"use client"
import { useEffect, useState } from "react"
import styles from "... @/app/home/page.modules.css"
import Button from "../../components/Button";
import Text from "../../components/Text";
import ButtonChat from "../../components/ButtonChat";
import ChatList from "../../components/ChatList";
import { Chicle } from "next/font/google";

export default function layoutHome({children}) {
    
  function redirigir(){
    location.href = "/home/propiedades?idUsuario=" + localStorage.getItem("idUsuario")
  }

  return (
      <div className={styles.div}>
        <div className={styles.container}>
        <h1>Conectando personas</h1>
        <h1>con sus lugares</h1>
        <h1>perfectos.</h1>
        <div className={styles.button}>
          <Button className={styles.button} onClick={redirigir} text="Iniciar sesión" />
        </div>
        </div>
      </div>
    );
}