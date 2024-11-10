"use client"
import styles from "./Chat.module.css";
import Button from "./Button";
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react"
import ButtonChat from "./ButtonChat";
import Input from "./Input";
import BubbleChat from "./BurbujaChats"
import { useRouter } from "next/navigation";




export default function Home() {
    const [selectedChat, setSelectedChat] = useState(-1);
    const [messagesList, setMessagesList] = useState({})
    const [inputValue, setInputValue] = useState('');
    const [nombre2, setNombre2] = useState('');
    const [chats, setChats] = useState([]);
    const [idUsuario, setIdUsuario] = useState(-1);
    
  const router = useRouter();

    const getVector = async (idUsuario) => {
        console.log("id es: "+ idUsuario)
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
    
        if (id) {
          setIdUsuario(parseInt(id, 10)); // Convertir a número
          getVector(id);
        }
    }, []);


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

    function handleChatClick(idChat){
        
        localStorage.setItem("idChat", idChat)
        console.log("chat numero: ", idChat)
        setSelectedChat(idChat)
        socket.emit('joinRoom' ,{room: {idChat}});
        entrarChat()
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    /*const handleSubmit = () => {
        if (inputValue.trim() && selectedChat) {
            let idUsuario = localStorage.getItem("idUsuario")
            const newMessage = {idUsuario, content: inputValue };
            setInputValue('');
        }
    };*/


    const {socket, isConnected} = useSocket();
    const [message, setMessage] = useState("Hola soy lucas")
    useEffect(()=>{
        if (!socket) return;

        

        socket.on('newMessage', (data) => {
            console.log("Conetado", data); 
        });

    }, [socket, isConnected]);


    function handleSendMessage(){
        socket.emit('sendMessage' ,{mensaje: message});
    }

    function redirigir(){
        router.push("/home/chat?idUsuario=" + localStorage.getItem('idUsuario'))
    }

    function entrarChat(){
        router.push("/home/chat/conversacion?idChat=" + localStorage.getItem('idChat'))
        
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.chats}>
                    <h2>Chats</h2>

                    {chats.map((chat) => {
                        const otroUsuarioNombre = (chat.nombre1 === localStorage.getItem("nombreUsuario")) ? chat.nombre2 : chat.nombre1;
                        return (
                            <a key={chat.idChat} href="#" onClick={() => handleChatClick(chat.idChat)}>
                                <BubbleChat idChat={chat.idChat} nombre={otroUsuarioNombre}/>
                            </a>
                        );
                    })}

                    <Input 
                        type="text"
                        placeholder="Nombre del usuario a agregar" // Vincula el valor del input al estado nombre2
                        onChange={setNombre2}  // Actualiza nombre2 cuando el usuario escribe
                    />
                    <ButtonChat className={styles.buttonChat} onClick={addChat} text="Agregar Chat"></ButtonChat>
                </div>

                <div className={styles.messages}>

                    

                    {/*selectedChat && messagesList[selectedChat]?.map((msg, index) => {
                        const isUserMessage = msg.userID === userID;
                        return isUserMessage ? (
                            <BubbleRight key={index} mensaje="hola que tal" />
                        ) : (
                            <BubbleLeft key={index} mensaje="hola linda" />
                        );
                        
                    })}
                    {selectedChat && <Input value={inputValue} onChange={handleInputChange} /*onSubmit={handleSubmit} />*/}
                </div>

            </div>



            <h1>Soy la ruta de /pruebas</h1>
            <Button onClick ={handleChatClick} text = "conectar"/>
            <Button onClick ={handleSendMessage} text = "Enviar "/>
            <input onChange={(event) => setMessage(event.target.value)}/>
        </>
    );
}
