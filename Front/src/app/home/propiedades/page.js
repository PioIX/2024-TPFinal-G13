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
import Propiedad from "../../../components/Propiedad";

export default function propiedades() {
  
  const router = useRouter();
  const [vector, setVector] = useState([]) 
  
  const [imagenes, setImagenes] = useState([]) 
  let isLoaded = false

  function redirigir(){
    location.href = "/home/propiedades/crearPropiedad?idUsuario=" + localStorage.getItem("idUsuario")
  }

    const getVector = async () => {
      /*const data = {
          id : localStorage.getItem("idUsuario")
      }*/  
      const response = await fetch('http://localhost:4000/propiedades',{
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

  const getImagenes = async (idPropiedad) => {
    /*const data = {
        id : localStorage.getItem("idUsuario")
    }*/  
    const response = await fetch('http://localhost:4000/getImagenes?idPropiedad=' + idPropiedad,{
        method:"GET",
        headers: {
            "Content-Type": "application/json",
          },
    })

    //Tengo que usar el await porque la respuesta del servidor es lenta
    const result = await response.json()
    console.log(result)
    setImagenes(result)
}

  useEffect(() => {
      if(!isLoaded){
          getVector();
          isLoaded = true;
      }
  },[]);

  function handleClickPropiedad(idPropiedad) {
    console.log(idPropiedad);
    router.push("propiedades/propiedad?idPropiedad=" + idPropiedad);
  }

  return (
    //<>
    //<div className={styles.chatContainer}>
    //  <Chat></Chat>
    //</div>
    //</>
    <div className={styles.container}>
      {
          vector.map(propiedad => (
              <>
                <Propiedad onClick={() => {handleClickPropiedad(propiedad.idPropiedad)}} idPropiedad={propiedad.idPropiedad} direccion={propiedad.direccion} tipoVivienda={propiedad.tipoVivienda} ambientes={propiedad.ambientes} alquiler={propiedad.alquiler} precio={propiedad.precio}/>
                {

                }
                <br></br>
              </>
            ))
      }
      <div className={styles.button}>
        <Button className={styles.button} onClick={redirigir} text="Agregar Propiedad" />
      </div>
    </div>
  );
}