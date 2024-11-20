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


    const BubbleRight = ({ mensaje, horaEnvio, tics }) => {
        return (
            <div style={{ textAlign: 'right', margin: '10px 0' }}>
                <div
                    style={{
                        display: 'inline-block',
                        background: '#994848',
                        color: '#fff',
                        padding: '10px',
                        borderRadius: '10px',
                        maxWidth: '70%',
                        position: 'relative',
                    }}
                >
                    <p style={{ margin: 0 }}>{mensaje}</p>
                    <span
                        style={{
                            fontSize: '12px',
                            color: '#d0f5dc',
                            marginTop: '5px',
                            display: 'block',
                            textAlign: 'right',
                        }}
                    >
                        {horaEnvio} {tics} {/* Hora + Tics */}
                    </span>
                </div>
            </div>
        );
    };

    const BubbleLeft = ({ mensaje, horaEnvio }) => {
        return (
            <div style={{ textAlign: 'left', margin: '10px 0' }}>
                <div
                    style={{
                        display: 'inline-block',
                        background: '#e0e0e0',
                        color: '#333',
                        padding: '10px',
                        borderRadius: '10px',
                        maxWidth: '70%',
                        position: 'relative',
                    }}
                >
                    <p style={{ margin: 0 }}>{mensaje}</p>
                    <span
                        style={{
                            fontSize: '12px',
                            color: '#999',
                            marginTop: '5px',
                            display: 'block',
                            textAlign: 'left',
                        }}
                    >
                        {horaEnvio} {/* Solo la hora */}
                    </span>
                </div>
            </div>
        );
    };    


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
    console.log("Valor de nombre2 antes de enviar:", nombre2);

    if (nombre2 === '') {
        alert("Por favor ingresa un nombre para el usuario");
        return;
    }

    const data = {
        usuario1: parseInt(localStorage.getItem("idUsuario")),
        nombre1: localStorage.getItem("nombreUsuario"),
        nombre2: nombre2
    };

    console.log("addChat es: ", data);

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

        // Limpiar el input después de agregar el chat
        setNombre2('');
    } else {
        alert("Chat ya existente");
    }
};



//---------------------------------- ELEGIR CHAT
    function handleChatClick(idChat){
        localStorage.setItem("idChat", idChat)
        console.log("chat numero: ", idChat)
        setSelectedChat(idChat)
        socket.emit('joinRoom' ,{room: selectedChat, idUsuario: localStorage.getItem("idUsuario")});
    };



//----------------------------------- TRAER LOS MENSAJES DEL CHAT
const getMensajes = (idChat) => {
    const mensajesGuardados = localStorage.getItem(`mensajes_${idChat}`);
    if (mensajesGuardados) {
        setMensajes(JSON.parse(mensajesGuardados));
    } else {
        setMensajes([]); // Si no hay mensajes, establece un array vacío
    }
};

useEffect(() => {
    if (selectedChat) {
        getMensajes(selectedChat);
    }
}, [selectedChat]);



  // ----------------------- ADD MENSAJES
  const addMensajes = () => { 
    if (inputValue.trim() === '') return; // Evita enviar mensajes vacíos

    const horaEnvio = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nuevoMensaje = {
        idChat: selectedChat,
        mensaje: inputValue,
        horaEnvio: horaEnvio,
        tics: '✓' // Estado inicial de los tics
    };

    // Actualizar mensajes en el estado
    setMensajes((prevMensajes) => {
        const nuevosMensajes = [...prevMensajes, nuevoMensaje];
        // Guardar mensajes actualizados en localStorage
        localStorage.setItem(`mensajes_${selectedChat}`, JSON.stringify(nuevosMensajes));
        return nuevosMensajes;
    });

    // Limpiar el input
    setInputValue('');
};



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
        <div className={styles.container}>
            {/* Sidebar de Chats */}
            <div className={styles.sidebar}>
                <h2>Chats</h2>
                <div className={styles.chatList}>
                    {chats.map((chat) => {
                        const currentUser = localStorage.getItem("nombreUsuario");
                        const nombreChat =
                            chat.nombre1 === currentUser ? chat.nombre2 : chat.nombre1;
    
                        return (
                            <div
                                key={chat.idChat}
                                className={styles.nombreChat}
                                onClick={() => handleChatClick(chat.idChat)}
                            >
                                <BubbleChat nombre={nombreChat} />
                            </div>
                        );
                    })}
                </div>
                <div className={styles.addChat}>
                    <Input
                        type="text"
                        placeholder="Nuevo chat"
                        value={nombre2}
                        onChange={(e) => setNombre2(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') addChat(); // Llama a la función addChat al presionar Enter
                        }}
                    />
                    <ButtonChat text="Agregar" onClick={addChat} />
                </div>
            </div>
    
            {/* Área del Chat */}
            <div className={styles.chatArea}>
                {selectedChat ? (
                    <div className={styles.chatContainer}>
                        <div className={styles.messages}>
                            {mensajes.map((mensaje, index) => {
                                const isCurrentUser =
                                    parseInt(mensaje.usuarioEnvia) !==
                                    parseInt(localStorage.getItem("idUsuario"));
                            

                                return isCurrentUser ? (
                                    <BubbleRight
                                        key={index}
                                        mensaje={mensaje.mensaje}
                                        horaEnvio={mensaje.horaEnvio}
                                        tics={mensaje.tics}
                                    />
                                ) : (
                                    <BubbleLeft
                                        key={index}
                                        mensaje={mensaje.mensaje}
                                        horaEnvio={mensaje.horaEnvio}
                                    />
                                );
                        })}

                        </div>
    
                        {/* Input y Botón */}
                        <div className={styles.messageInputContainer}>
                            <input
                                className={styles.messageInput}
                                type="text"
                                placeholder="Escribe un mensaje..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') addMensajes(); // Llama a la función addMensajes al presionar Enter
                                }}
                            />
                            <button
                                className={styles.sendButton}
                                onClick={addMensajes}
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.noChatSelected}>
                        <p>Selecciona un chat para empezar</p>
                    </div>
                )}
            </div>
        </div>
    );    
        
}
