"use client"
import styles from "./Chat.module.css";
import Button from "./Button";
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react"
import ButtonChat from "./ButtonChat";
import Input from "./Input";
import BubbleChat from "./BurbujaChats"
import { useRouter } from "next/navigation";
import ButtonMensaje from "./ButtonMensaje";
import BubbleRight from "./BurbujaDer";
import BubbleLeft from "./BurbujaIzq";
import React from "react";




export default function Home() {
    const [selectedChat, setSelectedChat] = useState();
    const [mensajes, setMensajes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [chats, setChats] = useState([]);
    const [idUsuario, setIdUsuario] = useState();
    
  const router = useRouter();


  //---------------------------- TRAE TODOS LOS CHATS
    const getVector = async (idUsuario) => {
        console.log("id es: "+ idUsuario)
        //socket.emit('getChats', {});
        const response = await fetch(`http://localhost:4000/chats?idUsuario=` + idUsuario, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response)
        const result = await response.json();
        console.log(result)
        
        setChats(result);
        let chats = result
        console.log(chats)
    };
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("idUsuario");
        console.log("anda")
    
        if (id) {
          setIdUsuario(parseInt(id, 10)); // Convertir a número
          getVector(id);
        }
    }, []);



//---------------------------------------- AGREGA CHATS
    const addChat = async () => { 
        console.log("Valor de nombre2 antes de enviar:", nombre2);  // Verifica el valor antes de enviar
    
        if (nombre2 === '') {
            alert("Por favor ingresa un nombre para el usuario");
            return;
        }
    
        const data = {
            usuario1: parseInt(localStorage.getItem("idUsuario")),
            nombre1: localStorage.getItem("nombreUsuario"),
            nombre2: nombre2  // Asegúrate de que aquí tienes el valor correcto
        };
    
        console.log("addChat es: ", data);  // Verifica los datos que se envían
    
        const response = await fetch('http://localhost:4000/addChat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        let respuesta = await response.json();
        console.log(respuesta);
        if (respuesta.success == true) {
            redirigir();
            alert("Chat agregado");
        } else {
            alert("Chat ya existente");
        }
    }


//---------------------------------- ELEGIR CHAT
    function handleChatClick(idChat){
        localStorage.setItem("idChat", idChat)
        console.log("chat numero: ", idChat)
        setSelectedChat(idChat)
        socket.emit('joinRoom' ,{room: idChat, idUsuario: localStorage.getItem("idUsuario")});
    };



//----------------------------------- TRAER LOS MENSAJES DEL CHAT
const getMensajes = async (selectedChat) => {
    try {
      console.log("id es: " + selectedChat);
      const response = await fetch(`http://localhost:4000/mensajes?idChat=${selectedChat}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const result = await response.json();
      console.log(result);
      setMensajes(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    console.log("Mensajes: ")
    if (mensajes.length != 0) {
        console.log(mensajes)
    } else{
    }
  },[mensajes])

  useEffect(() => {
    console.log("IdCHAT: " + selectedChat)
    let id = selectedChat
    if (id){
        getMensajes(selectedChat);
    }
  }, [selectedChat]);



  // ----------------------- ADD MENSAJES
  const addMensajes = async () => { 
    const data = {
        idChat: selectedChat,
        mensaje: inputValue,
        usuarioEnvia: parseInt(localStorage.getItem("idUsuario")),
         // Asegúrate de que aquí tienes el valor correcto
    };

    console.log("addMensaje es: ", data);  // Verifica los datos que se envían

    socket.emit('sendMessage' ,data)
}

    /*const handleSubmit = () => {
        if (inputValue.trim() && selectedChat) {
            let idUsuario = localStorage.getItem("idUsuario")
            const newMessage = {idUsuario, content: inputValue };
            setInputValue('');
        }
    };*/


    const {socket, isConnected} = useSocket();
    
    useEffect(()=>{
        if (!socket) return;

        

        socket.on('newMessage', (data) => {
            console.log("chat seleccionado: ", parseInt(localStorage.getItem("idChat")))
            //if (data.usuarioEnvia !== parseInt(localStorage.getItem("idUsuario"))){
            getMensajes(parseInt(localStorage.getItem("idChat"))) 
            //}
            
        });

    }, [socket, isConnected, selectedChat]);

    function redirigir(){
        router.push("/home/chat?idUsuario=" + localStorage.getItem('idUsuario'))
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2>Chats</h2>

                    <div className={styles.chatList}>
                        {chats.map((chat) => {
                            // Obtenemos el id del usuario actual desde localStorage
                            const nombreUsuarioActual = localStorage.getItem("nombreUsuario");
                            
                            if (chat.nombre1 === nombreUsuarioActual){
                                return (
                                    <a key={chat.idChat} onClick={() => handleChatClick(chat.idChat)}>
                                        <BubbleChat nombre={chat.nombre2} />
                                    </a>
                                );
                            } if (chat.nombre2 === nombreUsuarioActual)
                                return (
                                    <a key={chat.idChat} onClick={() => handleChatClick(chat.idChat)}>
                                        <BubbleChat nombre={chat.nombre1} />
                                    </a>
                                )
                            
                            ;
                        })}
                    </div>

                    <div className={styles.addChat}>
                        <Input 
                            type="text"
                            placeholder="Nombre del usuario a agregar" // Vincula el valor del input al estado nombre2
                            onChange={setNombre2}  // Actualiza nombre2 cuando el usuario escribe
                        />
                        <ButtonChat className={styles.buttonChat} onClick={addChat} text="Agregar Chat"></ButtonChat>
                    </div>

                </div>

                <div className={styles.chatArea}>
                    {selectedChat > 0 && 
                    <>
                    
                    <div className={styles.chatContainer}>
                    <div className={styles.messages}>
                            {mensajes.length > 0 ? (
                                <ul>

                                    {mensajes.map((mensaje) => {
                                        // Obtenemos el usuario actual desde localStorage y normalizamos el valor
                                        const usuarioActual = parseInt(localStorage.getItem("idUsuario"));
                                        const usuarioEnvia = parseInt(mensaje.usuarioEnvia); // Normalizamos también el remitente

                                        console.log("usuarioActual:", usuarioActual, "usuarioEnvia:", usuarioEnvia, mensaje); // Verifica los valores

                                        if (usuarioEnvia === usuarioActual) {
                                            // Si el usuario actual envió el mensaje, muestra BubbleRight
                                            return (
                                                <React.Fragment key={mensaje.idMensaje}>
                                                    <BubbleRight mensaje={mensaje.mensaje} />
                                                </React.Fragment>
                                            );
                                        } if (usuarioEnvia !== usuarioActual)
                                            // Si otro usuario envió el mensaje, muestra BubbleLeft
                                            return (
                                                <React.Fragment key={mensaje.idMensaje}>
                                                    <BubbleLeft mensaje={mensaje.mensaje} />
                                                </React.Fragment>
                                            );
                                        
                                    })}
                                </ul>
                            ) : (
                                <p>No hay mensajes</p>
                            )}
                        </div>
                    
                        

                        <div className={styles.messageInputContainer}>
                            <Input type="text"
                                placeholder="Envía un mensaje..." // Vincula el valor del input al estado nombre2
                                onChange={setInputValue}  // Actualiza nombre2 cuando el usuario escribe
                            />
                            <ButtonMensaje className={styles.ButtonMensaje} onClick={addMensajes} text="Enviar"/>
                        </div>

                    </div>
                    </>
                    }
                </div>

            </div>

        </>
    );
}
