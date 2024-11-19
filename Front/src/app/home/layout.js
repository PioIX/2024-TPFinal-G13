"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import styles from "./page.modules.css";
import Button from "../../components/Button";
import Text from "../../components/Text";
import ButtonChat from "../../components/ButtonChat";
import ChatList from "../../components/ChatList";
import { Chicle } from "next/font/google";

export default function layoutHome({children}) {
  
    const router = useRouter();
    const [vector, setVector] = useState([])
    function login(){
      router.replace("/")
      localStorage.setItem("idUsuario", 0)
    }
    return (
      <> 
        <div>
          <header className={styles.header}>
            <div className="logo">
            <a href={"/home"}>
                <img src='/5411estate.jfif' alt="Logo"></img>
            </a>
            </div>
            <nav>
            <ul>
                {localStorage.getItem("nombreUsuario") !== "admin" &&
                  <li><a href={"/home/equipo"}>Equipo</a></li>
                }

                {localStorage.getItem("nombreUsuario") === "admin" &&
                  <li><a onClick={login}>Cerrar Sesión</a></li>
                }
                
                <li><a href={"/home/propiedades"}>Propiedades</a></li>
                
                {localStorage.getItem("nombreUsuario") !== "admin" &&
                  <li><a href={"/home/contacto"}>Contacto</a></li>
                }
                
                {localStorage.getItem("nombreUsuario") !== "admin" &&
                  <li><a href={"/home/chat?idUsuario=" + localStorage.getItem("idUsuario")}>Chats</a></li>
                }
                
                
                {localStorage.getItem("nombreUsuario") === "admin" &&
                  <li><a href={"/home/verUsers"}>Usuarios</a></li>
                }
                <div className="user">
                
                {localStorage.getItem("nombreUsuario") !== "admin" &&
                  <a href={"/home/user?idUsuario=" + localStorage.getItem("idUsuario")}>
                  <img src='/imagenUsuario.png' alt="User"></img>
                  </a> 
                }

                {localStorage.getItem("nombreUsuario") === "admin" &&
                  <img src='/imagenUsuario.png' alt="User"></img>
                   
                }
                
                </div>
                {localStorage.getItem("nombreUsuario") !== "admin" &&
                  <li><a href={"/home/user?idUsuario=" + localStorage.getItem("idUsuario")}>Hola, {localStorage.getItem("nombreUsuario")}!</a></li>
                }

                {localStorage.getItem("nombreUsuario") === "admin" &&
                  <li><a >Hola, {localStorage.getItem("nombreUsuario")}!</a></li>
                }
              </ul>
            </nav>
          </header> {children}
        </div>
        <footer>
          <div className="info">
              <p>En 5411 Estate, estamos dedicados a ayudarte a encontrar el hogar de tus sueños.</p>
              <p>Con un equipo de expertos en el mercado inmobiliario de América Latina, ofrecemos servicios</p> 
              <p>personalizados de compra, venta y alquiler de propiedades. Tu satisfacción es nuestra</p> 
              <p>prioridad, así que no dudes en contactarnos para más información y descubre cómo</p>
              <p>podemos hacer realidad tus proyectos inmobiliarios.</p>
          </div>
          <div className="social-media">
              <a href="https://www.instagram.com/5411estateok?igsh=c2RueW5rb3kyenB3" target="_blank">
                  <img className="redes" src="/instagram-icon.png" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/5411Estate/" target="_blank">
                  <img className="redes" src="/facebook-icon.png" alt="Facebook" />
              </a>
              <a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmz_HCvkFoRh5u5CbfvGj31Cp26uvzhYSTuQ&s" target="_blank">
                  <img className="redes" src="/whatsapp-icon.png" alt="WhatsApp"/>
              </a>
          </div>
        </footer>
      </>
    );
  }