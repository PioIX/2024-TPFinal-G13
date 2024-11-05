import React, { useState } from "react";
import styles from "./Chat.module.css";

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
    const [chats] = useState([
        { chatID: '1', name: 'Tomas jefe' },
        { chatID: '2', name: 'Santiago asesor' },
        { chatID: '3', name: 'Juan asesor' },
        { chatID: '4', name: 'Lucas inversionista' },
        { chatID: '5', name: 'Agus actuario' },
        { chatID: '6', name: 'Nacho CM' }
    ]);

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
        </>
    );
}
