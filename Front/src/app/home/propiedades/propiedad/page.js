"use client"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "../../page.modules.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Registro from "../../../../components/Registro";
import Login from "../../../../components/Login";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import ButtonMensaje from "../../../../components/ButtonMensaje";
import Chat from "../../../../components/Chat";
import VerPropiedad from "../../../../components/VerPropiedad";

export default function propiedades() {
  
  const router = useRouter();
  
  const [idPropiedad, setidPropiedad] = useState('') 
  const [vector, setVector] = useState([]) 
  let isLoaded = false

  /*function redirigir(){
    location.href = "/home/propiedades/crearPropiedad?idUsuario=" + localStorage.getItem("idUsuario")
  }*/

    const getVector = async () => {
      /*const data = {
          id : localStorage.getItem("idUsuario")
      }*/  
      const response = await fetch('http://localhost:4000/propiedad?idPropiedad=' + idPropiedad,{
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
      let params = new URLSearchParams(document.location.search);
      setidPropiedad(params.get("id")); // is the string "Jonathan"
      
      console.log(idPropiedad)
  },[]);

  return (
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <div className={styles.container}>
       <VerPropiedad idPropiedad={vector.idPropiedad} direccion={vector.direccion} tipoVivienda={vector.tipoVivienda} ambientes={vector.ambientes} alquiler={vector.alquiler} precio={vector.precio}/>
    </div>
  );
}