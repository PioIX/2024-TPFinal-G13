// componentes funcionales
"use client"
import { useEffect, useState } from "react"
import styles from "../page.module.css";
import Button from "../../components/Button";
import Text from "../../components/Text";
import ButtonChat from "../../components/ButtonChat";
import ChatList from "../../components/ChatList";
import { Chicle } from "next/font/google";

const contacts = [
  {
    name: "Ana García",
    messages: [
      { user: "Ana García", content: "¡Hola! ¿Cómo estás?" },
      { user: "Yo", content: "Bien, ¿y tú?" },
      { user: "Ana García", content: "Todo bien, gracias. ¿Te gustaría hacer algo este fin de semana?" }
    ]
  },
  {
    name: "Carlos Pérez",
    messages: [
      { user: "Carlos Pérez", content: "¿Te llegaron los documentos?" },
      { user: "Yo", content: "Sí, los recibí. Gracias." },
      { user: "Carlos Pérez", content: "Perfecto, avísame si necesitas algo más." }
    ]
  },
  {
    name: "Lucía Martínez",
    messages: [
      { user: "Lucía Martínez", content: "¡Hola! ¿Ya viste la última serie de Netflix?" },
      { user: "Yo", content: "Sí, la empecé anoche." },
      { user: "Lucía Martínez", content: "¡Qué bien! ¿Qué te parece hasta ahora?" }
    ]
  },
  {
    name: "Javier López",
    messages: [
      { user: "Javier López", content: "Hola, ¿cómo te va?" },
      { user: "Yo", content: "Muy bien, gracias. ¿Y tú?" },
      { user: "Javier López", content: "Todo tranquilo. ¿Nos vemos mañana para la reunión?" }
    ]
  },
  {
    name: "María Rodríguez",
    messages: [
      { user: "María Rodríguez", content: "Hola, ¿te gustaría almorzar juntos hoy?" },
      { user: "Yo", content: "Claro, ¿a qué hora?" },
      { user: "María Rodríguez", content: "A las 2 PM está bien para mí." }
    ]
  },
  {
    name: "Fernando Sánchez",
    messages: [
      { user: "Fernando Sánchez", content: "¿Has visto el nuevo diseño de la app?" },
      { user: "Yo", content: "Sí, parece genial." },
      { user: "Fernando Sánchez", content: "Estoy pensando en hacer algunos ajustes." }
    ]
  },
  {
    name: "Isabel Gómez",
    messages: [
      { user: "Isabel Gómez", content: "¡Hola! ¿Cómo va todo?" },
      { user: "Yo", content: "Todo bien, ¿y tú?" },
      { user: "Isabel Gómez", content: "Estoy bien también. ¿Cómo va el proyecto?" }
    ]
  },
  {
    name: "Luis Fernández",
    messages: [
      { user: "Luis Fernández", content: "¿Cuándo podemos hacer la revisión del proyecto?" },
      { user: "Yo", content: "Podemos agendarla para la próxima semana." },
      { user: "Luis Fernández", content: "Perfecto, avísame el día que te venga bien." }
    ]
  },
  {
    name: "Claudia Ruiz",
    messages: [
      { user: "Claudia Ruiz", content: "Hola, ¿quieres ir al cine este viernes?" },
      { user: "Yo", content: "¡Claro! ¿Qué película quieres ver?" },
      { user: "Claudia Ruiz", content: "Aún no lo sé. ¿Tienes alguna sugerencia?" }
    ]
  },
  {
    name: "Pedro Morales",
    messages: [
      { user: "Pedro Morales", content: "¿Cómo van los preparativos para la fiesta?" },
      { user: "Yo", content: "Todo listo, solo faltan algunos detalles." },
      { user: "Pedro Morales", content: "Genial, ¿necesitas ayuda con algo?" }
    ]
  },
  {
    name: "Sara Ortega",
    messages: [
      { user: "Sara Ortega", content: "¿Ya terminaste el informe?" },
      { user: "Yo", content: "Sí, lo terminé ayer." },
      { user: "Sara Ortega", content: "Perfecto, ¿puedes enviármelo cuando tengas un momento?" }
    ]
  }
];

export default function layoutHome({children}) {
  
    const [variant, serVariant] = useState("login")
  
    return (
      <> 
        <div>
          <header className={styles.header}>
                <h1>BIENVENIDO A WHATSAPP</h1>
        </header> {children}
        </div>
          
        <div className={styles.container}>
          
          <div className={styles.contactos}>
            {contacts.map((contact) => (
              <ChatList name={contact.name}></ChatList>
            ))}
          </div>
          {/* <div className={styles.chatContainer}>
            <Text textoH2="Mensaje" placeholder="Escribir..."></Text>
            <Button text="Enviar" />
          </div> */}
        </div>
      </>
    );
  }
