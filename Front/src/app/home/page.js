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
    location.href = "/home/propiedades"
  }

  return (
      <div className={styles.div}>
        <div className={styles.container}>
        {localStorage.getItem("nombreUsuario") !== "admin" &&
        <>
        <h1>Conectando personas</h1>
        <h1>con sus lugares</h1>
        <h1>perfectos.</h1>
        <div className={styles.button}>
          <Button className={styles.button} onClick={redirigir} text="VER MÁS" />
        </div>
        </>
        }
        {localStorage.getItem("nombreUsuario") === "admin" &&
        <>
        
        <br></br>
        <h1>Bienvenido</h1>
        <h1>administrador</h1>
        <br></br>
        <br></br>
        <br></br>
        </>
        }
        
        </div>
      </div>
    );
}