"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import styles from "./page.modules.css";
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
  
    const router = useRouter();
    const [vector, setVector] = useState([])
    let isLoaded = false

    return (
      <> 
        <div>
          <header className={styles.header}>
            <div class="logo">
            <a href={"http://localhost:3000/home"}>
                <img src='/5411estate.jfif' alt="Logo"></img>
            </a>
            </div>
            <nav>
            <ul>
                <li><a href={"http://localhost:3000/home/equipo"}>Equipo</a></li>
                <li><a href={"http://localhost:3000/home/propiedades"}>Propiedades</a></li>
                <li><a href={"http://localhost:3000/home/contacto"}>Contacto</a></li>
                <li><a href={"http://localhost:3000/home/chat"}>Chats</a></li>
                <div class="user">
                <a href={""}>
                <img src='/imagenUsuario.png' alt="User"></img>
                </a>
                </div>
                <li><a href={""}>Hola, {localStorage.getItem("nombreUsuario")}!</a></li>
            </ul>
            </nav>
          </header> {children}
        </div>
        <footer>
          <div class="info">
              <p>En 5411 Estate, estamos dedicados a ayudarte a encontrar el hogar de tus sueños.</p>
              <p>Con un equipo de expertos en el mercado inmobiliario de América Latina, ofrecemos servicios</p> 
              <p>personalizados de compra, venta y alquiler de propiedades. Tu satisfacción es nuestra</p> 
              <p>prioridad, así que no dudes en contactarnos para más información y descubre cómo</p>
              <p>podemos hacer realidad tus proyectos inmobiliarios.</p>
          </div>
          <div class="social-media">
              <a href="https://www.instagram.com/5411estateok?igsh=c2RueW5rb3kyenB3" target="_blank">
                  <img class="redes" src="/instagram-icon.png" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/5411Estate/" target="_blank">
                  <img class="redes" src="/facebook-icon.png" alt="Facebook" />
              </a>
              <a href="https://www.google.com/search?q=culo&rlz=1C1GCEU_esAR1106AR1106&oq=culo&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQABgKGIAE0gEINTk0MmowajeoAgCwAgA&sourceid=chrome&ie=U" target="_blank">
                  <img class="redes" src="/whatsapp-icon.png" alt="WhatsApp"/>
              </a>
          </div>
        </footer>
      </>
    );
  }

  //se vende toda la pagina alibvaba por 78 camellos arabenses. AL hU Li aBa🧔🐫
