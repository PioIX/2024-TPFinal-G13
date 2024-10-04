"use client"

import Button from "./Button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import ButtonChat from "./ButtonChat";
import Image from "next/image";
import styles from "../app/page.module.css"
import Link from "next/link";
import Registro from "./Registro";
import Login from "./Login";
import Text from "./Text";
import ButtonMensaje from "./ButtonMensaje";

export default function Chat(){
    
    const router = useRouter();

    function handleClick(){ //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 
    }
    
    return(
        // for i in chats
        <>
            <Text textoH2="Mensaje" placeholder="Escribir..."></Text>
            <ButtonMensaje className={styles.buttonMensaje} onClick={handleClick} text="Enviar" />
        </>
    )
}