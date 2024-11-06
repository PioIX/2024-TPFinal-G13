"use client"
import { useSocket } from "../../../hooks/useSocket"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Button from "../../../components/Button";
import Login from "../../../components/Login";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";

export default function mensajes() {
  
  const router = useRouter();

  const {socket, isConnected} = useSocket();
    const [message, setMessage] = useState("Hola soy lucas")
    useEffect(()=>{
        if (!socket) return;

        socket.on('pingAll', (data) => {
            console.log("Me llego el evento pingAll", data); 
        });

        socket.on('newMessage', (data) => {
            console.log("Mensaje de la sala", data); 
        });

    }, [socket, isConnected]);


    function handleClick(){
        socket.emit('pingAll' ,{message: "Aguante el bicho"});
    }
    function handleJoinChat(){
        socket.emit('joinRoom' ,{room: "paula"});
    }
    function handleSendMessage(){
        socket.emit('sendMessage' ,{mensaje: message});
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
        <h1>Soy la ruta de /pruebas</h1>
        <Button onClick ={handleClick} text = "Enviar pingAll"/>
        <Button onClick ={handleJoinChat} text = "conectar"/>
        <Button onClick ={handleSendMessage} text = "Enviar "/>
        <input onChange={(event) => setMessage(event.target.value)}/>
      </div>
      </div>
    </>
  );
}
