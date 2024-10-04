"use client"
import Button from "../../components/Button"
import{ useSocket } from "../../hooks/useSocket"
import { useEffect, useState } from "react";


export default function UsersRanking(){
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
    
    return(
    <>
    <h1>Soy la ruta de /pruebas</h1>
    <Button onClick ={handleClick} text = "Enviar pingAll"/>
    <Button onClick ={handleJoinChat} text = "conectar"/>
    <Button onClick ={handleSendMessage} text = "Enviar "/>
    <input onChange={(event) => setMessage(event.target.value)}/>

    </>
    )
}