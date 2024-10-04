"use client"

import Button from "./Button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import ButtonChat from "./ButtonChat";

export default function ChatList({name}){
    
    const router = useRouter();

    function handleClick(){ //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        location.href = "/home/chat?idUsuario=" + localStorage.getItem("idUsuario")
        //REPLACE para que no se registre en el historial, solo vuelve a pag de inicio 
    }
    
    return(
        // for i in chats
        <>
            <ButtonChat onClick={handleClick} text={name}/>
        </>
    )
}