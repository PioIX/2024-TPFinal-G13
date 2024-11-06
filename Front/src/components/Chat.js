"use client"
import styles from "./Chat.module.css";
import Button from "./Button";
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react"
import ButtonChat from "./ButtonChat";


// Componente Input
const Input = ({ value, onChange, onSubmit }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className={styles.textInput}
        />
    );
};

// Componente BubbleLeft
const BubbleLeft = ({ mensaje }) => (
    <div className={styles.bubbleLeft}>{mensaje}</div>
);

// Componente BubbleRight
const BubbleRight = ({ mensaje }) => (
    <div className={styles.bubbleRight}>{mensaje}</div>
);

// Componente Chat
const Chat = ({ chatId, titulo }) => (
    <div className={styles.chatItem}>
        <span>{titulo}</span>
    </div>
);

export default function Home() {
    const [selectedChat, setSelectedChat] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [messagesList, setMessagesList] = useState({});
    const [usuario2, setUsuario2] = useState('');
    const [chats] = useState([
        { chatID: '1', name: 'Tomas jefe' },
        { chatID: '2', name: 'Santiago asesor' },
        { chatID: '3', name: 'Juan asesor' },
        { chatID: '4', name: 'Lucas inversionista' },
        { chatID: '5', name: 'Agus actuario' },
        { chatID: '6', name: 'Nacho CM' }
    ]);

    const addChat = async () => { //Links con lógica
        //Metodo push para registrar en el historial el cambio de pantalla
        console.log("inicio")
        const data = {
            usuario1: parseInt(localStorage.getItem("idUsuario")),
            usuario2: usuario2
        };
        console.log("addChat es: ",data)

        const response = await fetch('http://localhost:4000/addChat',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(data)
        })
        
        console.log(response)
        let respuesta = await response.json();
        console.log(respuesta)
        if (respuesta.success == true){
            alert("Chat agregado")
        } else {
            alert("Chat ya existente")
        }  
    } 

    const userID = 'user1';

    const handleChatClick = (chatId) => {
        setSelectedChat(chatId);
        const simulatedMessages = [
            { userID: 'user2', content: 'Hola, buen dia. Estoy disponible para lo que necesites' }
        ];
        setMessagesList((prev) => ({
            ...prev,
            [chatId]: simulatedMessages,
        }));
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() && selectedChat) {
            const newMessage = { userID, content: inputValue };

            setMessagesList((prev) => ({
                ...prev,
                [selectedChat]: [
                    ...(prev[selectedChat] || []),
                    newMessage,
                ],
            }));

            setInputValue('');
        }
    };

    const {socket, isConnected} = useSocket();
    const [message, setMessage] = useState("Hola soy lucas")
    useEffect(()=>{
        if (!socket) return;

        

        socket.on('newMessage', (data) => {
            console.log("Conetado", data); 
        });

    }, [socket, isConnected]);


    function handleJoinChat(){
        socket.emit('joinRoom' ,{room: "paula"});
    }
    function handleSendMessage(){
        socket.emit('sendMessage' ,{mensaje: message});
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.chats}>
                    <h2>Chats</h2>
                    {chats.map((chat) => (
                        <a key={chat.chatID} href="#" onClick={() => handleChatClick(chat.chatID)}>
                            <Chat chatId={chat.chatID} titulo={chat.name} />
                        </a>
                    ))}
                    <Input type="text" 
                        placeholder="Nombre del usuario a agregar" 
                        onChange={(event) => setUsuario2(event.target.value)}>
                    </Input>
                    <ButtonChat className={styles.buttonChat} onClick={addChat} text="Agregar Chat"></ButtonChat>
                </div>
                <div className={styles.messages}>
                    {selectedChat && messagesList[selectedChat]?.map((msg, index) => {
                        const isUserMessage = msg.userID === userID;
                        return isUserMessage ? (
                            <BubbleRight key={index} mensaje={msg.content} />
                        ) : (
                            <BubbleLeft key={index} mensaje={msg.content} />
                        );
                        
                    })}
                    {selectedChat && <Input value={inputValue} onChange={handleInputChange} onSubmit={handleSubmit} />}
                </div>

            </div>
            <h1>Soy la ruta de /pruebas</h1>
            <Button onClick ={handleJoinChat} text = "conectar"/>
            <Button onClick ={handleSendMessage} text = "Enviar "/>
            <input onChange={(event) => setMessage(event.target.value)}/>
        </>
    );
}
