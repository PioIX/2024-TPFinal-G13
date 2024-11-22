"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../page.modules.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../components/Registro";
import Login from "../../../components/Login";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import ButtonMensaje from "../../../components/ButtonMensaje";
import Chat from "../../../components/Chat";
import Usuario from "../../../components/Usuarios";
import Usuarios from "../../../components/Usuarios";

export default function propiedades() {
  
  const router = useRouter();
  const [vector, setVector] = useState([]) 
  let isLoaded = false


    const getVector = async () => {
      /*const data = {
          id : localStorage.getItem("idUsuario")
      }*/  
      const response = await fetch('http://10.1.5.140:4000/usuarios',{
          method:"GET",
          headers: {
              "Content-Type": "application/json",
            },
      })

      //Tengo que usar el await porque la respuesta del servidor es lenta
      const result = await response.json()
      console.log(result)
      setVector(result)
  }

  useEffect(() => {
      if(!isLoaded){
          getVector();
          isLoaded = true;
      }
  },[]);


  return (
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <div className={styles.container}>
      {
          vector.map(usuario => (
              <>
                <Usuarios idUsuario={usuario.idUsuario} nombre={usuario.nombre} contraseña={usuario.contraseña} nombreApellido={usuario.nombreApellido}/>
                <br></br>
              </>
            ))
      }
    </div>
  );
}